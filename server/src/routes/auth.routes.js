import express from 'express'
import { getMe, login, logout, registerUser } from './../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleares.js'

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", login)
router.get("/logout", authMiddleware, logout)
router.get("/getme", getMe)

export default router