import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";

export const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/signup", signUp)