import { sendError, sendSuccess } from '../utils/apiResponses.js'
import { hashPassword, verifyPassword } from '../utils/hashPassword.js'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js'

import User from './../models/User.model.js'
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            return sendError(res, 400, "All fields are required")
        }

        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return sendError(res, 400, "user already exists")
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            email,
            name,
            password: hashedPassword
        })

        return sendSuccess(res, 200, "user created successfully", user)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Internal server error")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            sendError(res, 400, "User already exist with this email id")
        }

        const verifiedPassword = await verifyPassword(password, existingUser.password)
        if (!verifiedPassword) {
            sendError(res, 404, "Password mismatch")
        }

        const accessToken = generateAccessToken()
        const refreshToken = generateRefreshToken()


        existingUser.refreshToken = refreshToken
        await existingUser.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ success: true, message: "user logged in successfully", accessToken })

    } catch (error) {
        console.log(error)
        sendError(res, 500, "internal server error")

    }
}

export const logout = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findByIdAndUpdate(id, {
            refreshToken: null
        })

        res.clearCookie("refreshtoken", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production" ? true : false,
        })
        sendSuccess(res, 200, "user logged out successfully")

    } catch (error) {
        console.log(error)
        sendError(res, 500, "logout failed")
    }
}

