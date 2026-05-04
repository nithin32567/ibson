import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'

import indexRoutes from './routes/index.routes.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


app.use("/api", indexRoutes)

app.get("/", (req, res) => {
    res.send("Api is running")
})

export default app