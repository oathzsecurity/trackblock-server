const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// This will treat incoming payloads as plain text (perfect for ESP)
app.use(express.text({ type: "*/*" }));

app.post("/", (req, res) => {
  console.log("📬 POST received to /");

  const raw = req.body;
  console.log("📦 Raw body:", raw);

  try {
    const parsed = JSON.parse(raw);
    console.log("✅ Parsed JSON:", parsed);
    res.status(200).send("Received!");
  } catch (err) {
    console.log("❌ Failed to parse JSON:", err.message);
    res.status(400).send("Bad JSON");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
