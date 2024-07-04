import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { getUsers, updateUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/getusers", protectRoute, getUsers)
userRouter.put("/updateuser", protectRoute, updateUser)

export default userRouter