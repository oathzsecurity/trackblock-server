const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Accept JSON from ESP32
app.use(express.json());

app.post("/", (req, res) => {
  console.log("📩 POST received to /");
  console.log("📦 Raw body:", req.body);

  try {
    const parsed = req.body; // Already parsed by express.json()
    console.log("✅ Parsed JSON:", parsed);
    res.status(200).send("Received");
  } catch (err) {
    console.log("❌ Failed to parse JSON:", err.message);
    res.status(400).send("Bad JSON");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
