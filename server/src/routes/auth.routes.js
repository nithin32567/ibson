import express from 'express'
import { login, logout, registerUser } from './../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleares.js'

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", login)
router.get("/logout", authMiddleware, logout)

export default router