const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.text({ type: "*/*" }));

app.post("/", (req, res) => {
  try {
    const raw = req.body;
    console.log("📦 Raw payload buffer:", raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
      console.log("✅ JSON parsed:", parsed);
    } catch (e) {
      console.log("❌ Not valid JSON:", e.message);
    }

    res.status(200).send("Received!");
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
