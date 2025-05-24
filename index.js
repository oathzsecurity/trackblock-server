const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let latestPostReceived = null;

app.use(express.json());

app.post('/track', (req, res) => {
  latestPostReceived = {
    time: new Date().toISOString(),
    body: req.body,
    headers: req.headers
  };
  console.log("🔥 TRACK POST:", JSON.stringify(req.body, null, 2));
  res.status(200).send('Trackblock POST received!');
});

app.get('/test-log', (req, res) => {
  if (latestPostReceived) {
    res.json(latestPostReceived);
  } else {
    res.send("No data received yet.");
  }
});

app.listen(port, () => {
  console.log(`🚀 Trackblock backend running on port ${port}`);
});
