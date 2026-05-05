

import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, "Street is required"],
        trim: true,
        minlength: [3, "Street must be at least 3 characters"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },
    zipCode: {
        type: String,
        required: [true, "Zip code is required"],
        match: [/^\d{6}$/, "Zip code must be 6 digits"], // India format
    },
    country: {
        type: String,
        required: true,
        default: "India",
    },

}, {
    _id: false
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "namee  must be 3 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address",
        ],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false, /*dont send in queries*/

    },
    refreshToken: {
        type: String,
        default: null
    },

    age: {
        type: Number,
        min: [18, "User must be at least 18 years old"],
        max: [100, "Age cannot exceed 100"],
    },

    address: {
        type: addressSchema,
        required: false
    }
}, { timestamps: true })



const User = mongoose.model("User", userSchema)


export default User