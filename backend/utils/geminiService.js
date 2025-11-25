// backend/utils/geminiService.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "";

export async function askGemini(prompt) {
  // use the v1 endpoint with a model that supports generateContent
  const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

  const body = {
    contents: [
      { parts: [{ text: prompt }] }
    ]
  };

  const headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": API_KEY
  };

  console.log("=== GEMINI DEBUG START ===");
  console.log("URL:", url);
  console.log("Headers:", "<headers set>");
  console.log("Body preview:", JSON.stringify(body).slice(0, 1000));

  try {
    const resp = await axios.post(url, body, { headers, timeout: 30000 });
    console.log("=== GEMINI RESPONSE STATUS ===", resp.status);
    // adjust parsing to the response shape
    const text =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      resp.data?.candidates?.[0]?.output ||
      resp.data?.outputText ||
      JSON.stringify(resp.data).slice(0, 2000);
    console.log("=== GEMINI DEBUG END ===");
    return text;
  } catch (err) {
    console.error("=== GEMINI CALL ERROR ===");
    console.error("Status:", err?.response?.status);
    console.error("Data:", JSON.stringify(err?.response?.data, null, 2));
    console.error("Message:", err?.message);
    throw err;
  }
}
