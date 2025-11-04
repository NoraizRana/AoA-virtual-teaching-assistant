import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";   
app.use("/api", routes);

// .env file load
dotenv.config();

// Express app banaya
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port .env se ya default 5000
const PORT = process.env.PORT || 5000;

// --- MongoDB Connection ---
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is live at http://localhost:${PORT}`);
});
