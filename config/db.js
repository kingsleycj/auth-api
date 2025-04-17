const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
      console.log("Connecting to MongoDB...");
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "Auth-API",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1); // Exit process with failure
    }
  };