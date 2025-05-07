import request from "supertest";
import app from "../app"; // Adjust the import for your app
import { hashingPassword } from "../src/utils/password.util";
import User from "../src/models/user.model"; // Adjust path

describe("User Authentication", () => {
  let user: any;

  beforeAll(async () => {
    // Create a user before tests
    user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: await hashingPassword("password123"),
    });
  });

  afterAll(async () => {
    await User.deleteMany(); // Clean up user data after tests
  });

  it("should return JWT token on valid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nonexistent@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
