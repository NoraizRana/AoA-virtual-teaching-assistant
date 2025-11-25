// backend/utils/listModels.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

async function listModels(version = "v1") {
  const url = `https://generativelanguage.googleapis.com/${version}/models`;
  try {
    const resp = await axios.get(url, {
      headers: { "x-goog-api-key": API_KEY }
    });
    console.log("=== LIST MODELS", version, "===\n", JSON.stringify(resp.data, null, 2));
  } catch (err) {
    console.error("Error listing", version, ":", err?.response?.status);
    console.error(err?.response?.data || err.message);
  }
}

(async () => {
  await listModels("v1");
  await listModels("v1beta");
})();
