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

// Pre-save hook to hash password
userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) return next(); // Only hash if password changed
        const salt = await bcrypt.genSalt(10);  // generate salt
        this.password = await bcrypt.hash(this.password, salt);  // hash with salt
        next();
});

userSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User;