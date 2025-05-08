const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.raw({ type: "*/*" }));

app.post("/", (req, res) => {
  console.log("📬 Received POST to /");
  const raw = req.body;
  console.log("📦 Raw payload buffer:", raw);
  const text = raw.toString();
  console.log("🔍 As text:", text);

  try {
    const parsed = JSON.parse(text);
    console.log("✅ JSON parsed:", parsed);
  } catch (e) {
    console.log("❌ Not valid JSON");
  }

  res.status(200).send("Received");
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});
