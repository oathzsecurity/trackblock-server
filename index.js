const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.raw({ type: "*/*" }));

app.post("/", (req, res) => {
  console.log("✅ Received POST request");
  console.log("📦 Payload:", req.body.toString());
  res.status(200).send("All good, mate.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
