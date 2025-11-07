// === Trackblock Ingest Server ===
// Lightweight HTTP ingest for GPS + MAC address data from ESP32/SIM modules

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory logs (temporary)
let logs = [
  { init: "true" }
];

// Root route (sanity check)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Trackblock HTTP endpoint alive ✅" });
});

// POST endpoint for device ingestion
app.post("/data", (req, res) => {
  try {
    const payload = req.body;
    logs.push({
      ...payload,
      timestamp: new Date().toISOString()
    });

    console.log("📩 Data received:", payload);

    return res.json({
      status: "success",
      message: "Data received",
      received: payload
    });
  } catch (err) {
    console.error("❌ Error handling POST /data", err);
    return res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

// View logs
app.get("/logs", (req, res) => {
  res.json(logs);
});

// Clear logs
app.delete("/logs", (req, res) => {
  logs = [];
  res.json({ status: "cleared" });
});

// === Server binding ===
// IMPORTANT: bind to 0.0.0.0 so Railway TCP proxy can reach it
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Trackblock ingest running on port ${PORT}`);
});
