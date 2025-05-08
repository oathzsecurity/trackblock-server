const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Accept raw body data regardless of content-type
app.use(express.raw({ type: "*/*" }));

// Listen on root path "/"
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

    res.status(200).send("✅ Received loud and clear!");
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).send("Server error");
  }
});

// Boot it up
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
