import app from './app.js'
import connectDB from './config/connectDB.js'
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log("connected to the server and databse", PORT)
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer()