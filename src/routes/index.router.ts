import express from "express";
import authRoutes from './auth.router';
import taskRoutes from './task.router';

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/task", taskRoutes)
export default router;