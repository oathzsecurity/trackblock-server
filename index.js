const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.text({ type: "*/*" }));

app.post("/", (req, res) => {
  try {
    const body = req.body;
    console.log("📦 Raw body:", body);

    try {
      const parsed = JSON.parse(body);
      console.log("✅ Parsed JSON:", parsed);
    } catch (e) {
      console.log("❌ Failed to parse JSON");
    }

    res.status(200).send("Received");
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
