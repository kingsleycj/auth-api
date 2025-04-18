const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth.controller")
const profile = require("../controllers/profile.controller")
const protect = require("../middlewares/auth.middleware")

// Public routes
router.post("/register", authController.register)
router.post("/login", authController.login)

// Protected route: fetch own profile
router.get("/me", protect, profile.viewProfile)

// Refresh route
router.post('/refresh-token', authController.refreshToken)

module.exports = router;