import app from './app.js'
import connectDB from './config/connectDB.js'


const startServer = async () => {
    try {
        await connectDB()
        app.listen(process.env.PORT, () => {
            console.log("PORT connected and databse connected.. PORT: ", process.env.PORT)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer()