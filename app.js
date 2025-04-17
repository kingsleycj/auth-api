const express = require("express");
// const mongoose = require("mongoose");
const {connectDB} = require("./config/db")
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
// middleware to parse JSON requests
app.use(express.json());

// Routes
// const authRoutes = require("./routes/auth.routes");
// app.use("/api/v1/auth", authRoutes);

// Connect to MongoDB
connectDB();

// root route
app.get("/", (req, res) => {
  res.send("Auth API is running...");
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({ message: "An error occurred" });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
