import express from "express";
import { registerValidation } from "../validations/auth.validation";
import { validateRequest } from "../middlewares/validate.middleware";
import { register } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);

export default express.Router();
