import express from "express";
import {
    deleteMessage,
  getLatestMessages,
  getMessages,
  sendMessage,
  starMessage,
  starredMessages,
  updateMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const msgRouter = express.Router();

msgRouter.post("/send/:id", protectRoute, sendMessage);
msgRouter.get("/get/:id", protectRoute, getMessages);
msgRouter.get("/getlatestmsg/:id", protectRoute, getLatestMessages);
msgRouter.put("/updatemsg/:id", protectRoute, updateMessage);
msgRouter.delete("/deletemsg/:id", protectRoute, deleteMessage)
msgRouter.patch("/star/:id", protectRoute, starMessage)
msgRouter.get("/starred/:id", protectRoute, starredMessages)

export default msgRouter;
