const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Optional: Basic log for incoming requests
app.use((req, res, next) => {
  console.log(`📡 Incoming ${req.method} to ${req.url}`);
  next();
});

// POST endpoint for ESP32
app.post("/", (req, res) => {
  let bodyData = '';

  req.on('data', chunk => {
    bodyData += chunk;
  });

  req.on('end', () => {
    console.log("📦 Raw body string:", bodyData);

    try {
      const parsed = JSON.parse(bodyData);
      console.log("✅ Parsed JSON:", parsed);
      res.status(200).send("Received");
    } catch (err) {
      console.log("❌ Failed to parse JSON:", err.message);
      res.status(400).send("Bad JSON");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
