const User = require("../models/user.model")

const generateToken = require("../utils/generateTokens")

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