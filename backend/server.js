// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// add right after app.use(express.json());
app.use((req, res, next) => {
  console.log(">>> Incoming request:", req.method, req.path);
  next();
});


// DB
const MONGO = process.env.MONGODB_URI;
if (MONGO) {
  mongoose
    .connect(MONGO)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connect error:", err.message));
} else {
  console.log("No MONGODB_URI in .env — skipping DB connect");
}

// Proper __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to check file exists relative to this file
function fileExistsRel(relPath) {
  const full = path.join(__dirname, relPath);
  return fs.existsSync(full);
}

(async () => {
  try {
    const possibleRoutes = [
      { file: "./routes/auth.js", mount: "/api/auth" },
      { file: "./routes/chat.js", mount: "/api/chat" },
      { file: "./routes/topics.js", mount: "/api/topics" },
    ];

    for (const r of possibleRoutes) {
      if (fileExistsRel(r.file)) {
        try {
          // Convert absolute path to file:// URL so import() accepts it on Windows
          const absPath = path.join(__dirname, r.file);
          const url = pathToFileURL(absPath).href;
          const mod = await import(url);
          if (mod && mod.default) {
            app.use(r.mount, mod.default);
            console.log(`Mounted route ${r.file} -> ${r.mount}`);
          } else {
            console.log(`Skipped ${r.file}: module has no default export`);
          }
        } catch (e) {
          console.error(`Error importing ${r.file}:`, e?.message || e);
        }
      } else {
        console.log(`Route file not found (skipping): ${r.file}`);
      }
    }

    app.get("/", (req, res) => res.send("Server running"));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error("Fatal server startup error:", err);
    process.exit(1);
  }
})();
