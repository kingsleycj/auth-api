const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateTokens")
const {generateRefreshToken} = require("../utils/generateRefreshToken")


exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try{ 
        // check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({message: "User Already exits"})
        }

        // proceed to creating a new user
        const user = await User.create({ username, email, password })

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log("Registration Error: ", error);
        res.status(500).json({ message: "An Error Occurred when Creating New User" })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password")
        if (!user) return res.status(400).json({message: "Invalid Credentials Inputed"})

        // Compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({message: "Invalid Password"})

            const refreshToken = generateRefreshToken(user._id)
            user.refreshToken = refreshToken
            await user.save()

            res.status(200).json({
                message: "Login Successful",
                user: { 
                    _id: user._id,
                    username: user.username,
                    email: user.email, 
                    refreshToken: user.refreshToken
                },
                token: generateToken(user._id),
                refreshToken,
            })
    } catch (error) {
        console.error("Login Error: ", error)
        res.status(500).json({messae: "Error Occurred While Attempting Login"})
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({ message: "No Refresh Token Provided"})
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }

        const newAccessToken = generateToken(user._id)
        res.status(200).json({ token: newAccessToken })
    } catch (error) {
        console.log("Refresh Token Error: ", error);
        res.status(403).json({ message: "Invalid or expired refresh token. " })
    }
}