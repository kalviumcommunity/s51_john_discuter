import express from "express";
import {
    deleteMessage,
  getLatestMessages,
  getMessages,
  sendMessage,
  updateMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const msgRouter = express.Router();

msgRouter.post("/send/:id", protectRoute, sendMessage);
msgRouter.post("/get/:id", protectRoute, getMessages);
msgRouter.get("/getlatestmsg/:id", protectRoute, getLatestMessages);
msgRouter.put("/updatemsg/:id", protectRoute, updateMessage);
msgRouter.delete("/deletemsg/:id", protectRoute, deleteMessage)


export default msgRouter;
