const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post("/", (req, res) => {
  console.log("📦 Data received:", req.body);
  res.json({ status: "received" });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
