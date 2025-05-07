import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../src/models/user.model';
import { hashingPassword } from '../src/utils/password.util';

describe('User Authentication', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'Password123';

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    const hashed = await hashingPassword(testPassword);

    await User.create({
      email: testEmail,
      password: hashed,
      role: 'user',
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it('should return JWT token on valid login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'wrong-password',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });
});
