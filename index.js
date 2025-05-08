const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;

// Use express.raw to get the raw body (since the ESP doesn't send proper headers for JSON parsing)
app.use(express.raw({ type: "*/*" }));

app.post("/", (req, res) => {
  console.log("✅ Received POST request");
  console.log("🔍 Raw body:", req.body.toString());  // Convert buffer to string

  res.status(200).send("👍 Received");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
