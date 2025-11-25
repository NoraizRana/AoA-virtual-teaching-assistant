import express from "express";
import { askGemini } from "../utils/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message missing" });
  }

  try {
    const reply = await askGemini(text);
    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: "AI Error", details: err.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    const reply = await askGemini("Explain Bubble Sort simply.");
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
