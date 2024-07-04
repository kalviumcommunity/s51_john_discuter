import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/get", (req, res) => {
    res.json({
        message: "received get request"
    });
});

// Registering the router with the app
app.use("/", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
