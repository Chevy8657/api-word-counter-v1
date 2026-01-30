const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "64kb" }));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Word counter
app.post("/v1/word-count", (req, res) => {
  const { input } = req.body;

  if (typeof input !== "string") {
    return res.status(400).json({ error: "Input must be a string." });
  }

  const trimmed = input.trim();
  const count = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

  return res.status(200).json({ count });
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
