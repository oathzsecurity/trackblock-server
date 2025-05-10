const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// 🔧 Accept plain text — perfect for ESP JSON
app.use(express.text({ type: "*/*" }));

app.post("/", (req, res) => {
  console.log("📬 POST received to /");

  const body = req.body;
  console.log("📦 Raw body:", body);

  try {
    const parsed = JSON.parse(body);
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
