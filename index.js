const express = require("express");
const app = express();
const PORT = process.env.PORT || 443;

app.use(express.json());

app.post("/", (req, res) => {
  console.log("📩 POST received to /");
  console.log("📦 Headers:", req.headers);
  console.log("📦 Body:", req.body);

  if (!req.body || typeof req.body !== "object") {
    console.log("❌ Invalid JSON or empty body");
    return res.status(400).send("Bad Request");
  }

  res.status(200).send("✅ Message received by server.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
