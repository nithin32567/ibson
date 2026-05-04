import { sendError, sendSuccess } from '../utils/apiResponses.js'
import { hashPassword } from '../utils/hashPassword.js'

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
        return sendError(res, 500, "Internal server error")

    }
}


