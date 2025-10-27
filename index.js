// === TRACKBLOCK SERVER (Production + File Logging) ===
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;

// Ensure logs folder exists
const logDir = path.join(process.cwd(), "data", "logs");
fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, "trackblock-log.json");

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Trackblock server is live and healthy!");
});

// Receive data
app.post("/data", (req, res) => {
  const payload = req.body;
  console.log("📡 New Trackblock payload:", payload);

  // Read current log
  let logs = [];
  try {
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
    }
  } catch (err) {
    console.error("⚠️ Error reading existing log file:", err);
  }

  // Append and save
  logs.push({ ...payload, receivedAt: new Date().toISOString() });
  try {
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    console.log("📝 Payload appended to log file.");
  } catch (err) {
    console.error("⚠️ Error writing to log file:", err);
  }

  res.status(200).json({ status: "success", message: "Data received" });
});

app.listen(PORT, () => {
  console.log(`🚀 Trackblock server running on port ${PORT}`);
});
cd ~/trackblock-server
mkdir -p data/logs

