const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 5,
    },
}, {
    timestamps: true,
})