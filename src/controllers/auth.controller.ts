import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { STATUSCODE } from "../utils/statuscode";
import { comparePassword, hashingPassword } from "../utils/password.util";
import { generateToken } from "../utils/jwt.util";
import redisClient from "../../config/redis.config";
import { handleResponse } from "../utils/response.util";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(STATUSCODE.BAD_REQUEST)
        .json({ message: "Email already in use" });
      return;
    }

    const user = new User({
      name,
      email,
      password: await hashingPassword(password),
      role: role || "user",
    });

    await user.save();
    res
      .status(STATUSCODE.CREATED)
      .send(handleResponse("User registered successfully")) ;
  } catch (err) {}
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(STATUSCODE.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
      return;
    }
    const isMatch = await comparePassword(user.password, password);
    if (!isMatch) {
      res
        .status(STATUSCODE.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken({ userId: user._id, role: user.role });

    res.status(STATUSCODE.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(STATUSCODE.BAD_REQUEST).json({ message: "No token provided" });
    return;
  }
  const isBlacklisted = await redisClient.get(token);
  if (isBlacklisted) {
    res.status(401).json({ message: "Token has been revoked" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    await redisClient.set(token, "blacklisted", { EX: expiresIn });

    res.status(STATUSCODE.OK).json({ message: "Signed out successfully" });
  } catch (err) {
    res.status(STATUSCODE.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};
