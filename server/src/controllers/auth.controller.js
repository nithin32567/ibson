import { sendError, sendSuccess } from '../utils/apiResponses.js'
import { hashPassword, verifyPassword } from '../utils/hashPassword.js'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js'

import User from './../models/User.model.js'
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
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

        const userResponse = user.toObject()
        delete userResponse.password

        return sendSuccess(res, 201, "user created successfully", userResponse)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Internal server error")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email?.trim() || !password?.trim()) {
            return sendError(res, 400, "Email and password are required")
        }

        const existingUser = await User.findOne({ email }).select("+password")
        if (!existingUser) {
            return sendError(res, 404, "User not found")
        }

        const verifiedPassword = await verifyPassword(
            password,
            existingUser.password
        );

        if (!verifiedPassword) {
            return sendError(res, 401, "Invalid email or password")
        }

        const tokenPayload = { id: existingUser._id.toString() }
        const accessToken = generateAccessToken(tokenPayload)
        const refreshToken = generateRefreshToken(tokenPayload)


        existingUser.refreshToken = refreshToken
        await existingUser.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        const userResponse = existingUser.toObject()
        delete userResponse.password
        delete userResponse.refreshToken

        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            accessToken,
            user: userResponse
        })

    } catch (error) {
        console.log(error)
        return sendError(res, 500, "internal server error")

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
