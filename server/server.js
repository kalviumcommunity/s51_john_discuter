import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv"
import msgRouter from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

import { app, server } from "./socket/socket.js"

dotenv.config()
const corsOptions = {
    origin: "https://s51-john-discuter.netlify.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

const router = express.Router();

router.get("/get", (req, res) => {
    res.json({
        message: "received get request"
    });
});

app.use("/auth", authRouter)
app.use("/message", msgRouter)
app.use("/users", userRouter)

const db = async() => {
    try {
        await connectDB()
        server.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        
    }
}

db()