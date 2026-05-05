import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import indexRoutes from './routes/index.routes.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(helmet())

app.use(cookieParser())
app.use(morgan("dev"))


const isProd = process.env.NODE_ENV === "production"

const devOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",

]

const prodOrigins = [
    "https://flyteasy.com",
    "https://demo.flyteasy.com"
]


const allowedOrigins = isProd ? prodOrigins : devOrigins


app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return (callback(new Error("cors not allowd")))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATHC", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


app.use("/api", indexRoutes)

app.get("/", (req, res) => {
    res.send("Api is running")
})

export default app