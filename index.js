const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Correct middleware to parse JSON bodies
app.use(express.json());

app.post("/webhook", (req, res) => {
  try {
    console.log("✅ JSON payload received:", req.body);
    res.status(200).send("Received");
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
