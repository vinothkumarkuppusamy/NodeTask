import express from "express";
import { loginValidation, registerValidation } from "../validations/auth.validation";
import { validateRequest } from "../middlewares/validate.middleware";
import { login, register, signout } from "../controllers/auth.controller";

const router = express.Router();

router
.post("/register", registerValidation, validateRequest, register)
.post("/login", loginValidation, validateRequest, login)
.get('/signout', signout)

export default router;
