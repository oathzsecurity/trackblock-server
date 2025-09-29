app.use(require("express").json());

app.post("/test-log", (req, res) => {
  console.log("📡 Test-log received:", req.body);
  res.json({ ok: true, received: req.body });
});
