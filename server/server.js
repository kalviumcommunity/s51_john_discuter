import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/get", (req, res) => {
    res.json({
        message: "received get request"
    });
});

app.use("/auth", authRouter)

const db = async() => {
    try {
        await connectDB()
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        
    }
}

db()