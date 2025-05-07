import { Request, Response, NextFunction } from "express";
import { Task } from "../models/index.model";
import { STATUSCODE } from "../utils/statuscode";
import { handleResponse } from "../utils/response.util";
import redisClient from "../../config/redis.config";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.create({ ...req.body});
    res
      .status(STATUSCODE.CREATED)
      .json(handleResponse("Task created successfully", task));
  } catch (err) {
    next(err);
  }
};
export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  try {
    const { status, dueDate, user } = req.query;

    const filter: any = {};
    const statusMap: Record<string, string> = {
      "1": "pending",
      "2": "in-progress",
      "3": "complete",
    };
    if (status) {
      const statusStr = statusMap[status as string] || (status as string);
      filter.status = statusStr;
    }

    if (dueDate) {
      const date = new Date(dueDate as string);
      const fromDate = new Date(date.setHours(0, 0, 0, 0));
      const endDate = new Date(date.setHours(23, 59, 59, 999));
      filter.dueDate = { $gte: fromDate, $lte: endDate };
    }

    if (user) {
      filter.assignedTo = { $regex: user as string, $options: "i" };
    }

    const cacheKey = `tasks:${JSON.stringify(filter)}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const tasks = JSON.parse(cachedData)
     res
        .status(STATUSCODE.OK)
        .json(handleResponse("Tasks retrieved..", {tasks: tasks, totalDocs: tasks.length}));
      return;
      }

    const tasks = await Task.find(filter).populate("assignedTo");
    await redisClient.setEx(cacheKey, 60, JSON.stringify(tasks));

    res
      .status(STATUSCODE.OK)
      .json(handleResponse("Tasks retrieved", { tasks, totalDocs: tasks.length}));
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(STATUSCODE.NOT_FOUND).json(handleResponse("Task not found"));
      return;
    }
    res.status(STATUSCODE.OK).json(handleResponse("Task retrieved", task));
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(STATUSCODE.NOT_FOUND).json(handleResponse("Task not found"));
      return;
    }
    res.status(STATUSCODE.OK).json(handleResponse("Task updated", task));
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task){
      res
        .status(STATUSCODE.NOT_FOUND)
        .json(handleResponse("Task not found"));
      return;
      }
    res.status(STATUSCODE.OK).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
