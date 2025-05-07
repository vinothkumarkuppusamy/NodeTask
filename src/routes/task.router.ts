import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

import { createTaskValidation, updateTaskValidation } from "../validations/task.validation"
import { authenticate, authorize } from "../middlewares/auth.middleware";
const router = express.Router();

router
  .post("/", authenticate,createTaskValidation, createTask)
  .get("/", authenticate, getAllTasks)
  .get("/:id", authenticate, getTaskById)
  .put("/:id", authenticate, updateTaskValidation, updateTask)
  .delete("/:id", authenticate, authorize('admin'), deleteTask)

export default router;
