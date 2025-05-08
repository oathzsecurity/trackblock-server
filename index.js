const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Log all requests regardless of type
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Accept raw body of any type
app.use(express.raw({ type: "*/*" }));

app.post("/", (req, res) => {
  try {
    console.log("📥 HEADERS:", req.headers);

    const raw = req.body;
    console.log("📦 Raw Buffer:", raw);

    const text = raw.toString();
    console.log("🔍 As text:", text);

    try {
      const json = JSON.parse(text);
      console.log("✅ JSON Parsed:", json);
    } catch (e) {
      console.log("❌ Failed to parse JSON");
    }

    res.status(200).send("✅ OK from root path");
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).send("💥 Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
