import mongoose from "mongoose";

export default async function connectDB() {
    try {

        const response = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection failed", response)
    } catch (error) {
        console.log("error in connecting database")
    }
}