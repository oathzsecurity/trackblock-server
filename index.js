// === TRACKBLOCK SERVER (Production Stable Build) ===

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Ensure log folder exists
const logDir = path.join(__dirname, "data", "logs");
fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, "trackblock-log.json");

// Root route
app.get("/", (req, res) => {
  res.send("✅ Trackblock server is live and healthy!");
});

// POST route
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

  res.status(200).json({ status: "success", message: "Data received" });
});

// GET route for viewing logs
app.get("/logs", (req, res) => {
  try {
    if (fs.existsSync(logFile)) {
      const logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
      return res.json(logs);
    } else {
      return res.status(404).json({ message: "No logs found yet" });
    }
  } catch (err) {
    console.error("⚠️ Error reading logs:", err);
    return res.status(500).json({ error: "Failed to read logs" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Trackblock server running on port ${PORT}`);
});
