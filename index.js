const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Parse incoming JSON payloads (specifically for ESP32)
app.use(express.json());

app.post("/", (req, res) => {
  console.log("📩 POST received to /");
  console.log("📦 Parsed body:", req.body);

  if (!req.body || typeof req.body !== "object") {
    console.log("❌ Invalid JSON or empty body");
    return res.status(400).send("Bad Request");
  }

  res.status(200).send("Received");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
