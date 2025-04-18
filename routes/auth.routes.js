const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth.controller")
const profile = require("../controllers/profile.controller")

// Public routes
router.post("/register", authController.register)
router.post("/login", authController.login)

// Protected route: fetch own profile
router.get("/me", protect, profile.viewProfile)


module.exports = router;