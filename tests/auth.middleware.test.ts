import { authorize } from '../src/middlewares/auth.middleware';
import { Request, Response } from 'express';

describe('Authorize Middleware', () => {
  const req: any = { user: { role: 'user' } };
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  it('should allow authorized role', () => {
    authorize('user')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should reject unauthorized role', () => {
    req.user.role = 'guest';
    authorize('admin')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});