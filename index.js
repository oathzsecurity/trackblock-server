const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Automatically parse JSON

app.post("/", (req, res) => {
  const { message } = req.body;

  if (message) {
    console.log("📡 Received message:", message);
    res.status(200).send("✅ Message received");
  } else {
    console.log("⚠️ No message field in body");
    res.status(400).send("❌ Bad request: No 'message' field");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
