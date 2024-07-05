import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("started mongoose")
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected...")
    } catch (err) {
        console.error(err.message);
    }
}