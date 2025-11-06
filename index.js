// POST route (accepts HTTP or HTTPS, no redirect, no body)
app.post("/data", (req, res) => {
  const payload = req.body;
  console.log("📦 New Trackblock payload:", payload);

  let logs = [];
  try {
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
    }
  } catch (err) {
    console.error("⚠️ Failed to read existing log file:", err);
  }

  logs.push({ ...payload, receivedAt: new Date().toISOString() });

  try {
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), "utf8");
    console.log("✅ Payload logged successfully!");
  } catch (err) {
    console.error("⚠️ Error writing to log file:", err);
  }

  // ✅ Return 200 OK, no JSON body (required by modem)
  res.status(200).end();
});
