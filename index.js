const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.raw({ type: "*/*" }));

app.post("/", (req, res) => {
  try {
    const raw = req.body;
    console.log("📦 Raw payload buffer:", raw);
    const text = raw.toString();
    console.log("🔍 As text:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
      console.log("✅ JSON parsed:", parsed);
    } catch (e) {
      console.log("❌ Not valid JSON");
    }

    res.status(200).send("Received");
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
