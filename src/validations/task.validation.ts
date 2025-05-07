import { body } from "express-validator";
import mongoose from "mongoose";
export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "in-progress", "complete"])
    .withMessage("Status must be one of: pending, in-progress, complete"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),

  body("assignedTo")
    .notEmpty()
    .isString()
    .withMessage("AssignedTo is required"),
];

export const updateTaskValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "complete"])
    .withMessage("Status must be one of: pending, in-progress, complete"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid ISO8601 date"),

  body("assignedTo")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("AssignedTo must be a valid ObjectId"),
];
