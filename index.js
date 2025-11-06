// ============================
// Trackblock Ingest Server v3
// HTTP allowed ONLY on /data
// Everything else stays HTTPS
// ============================

import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(cors());
app.use(bodyParser.json());

// ---------- Log file path ----------
const logFile = path.join(process.cwd(), "data", "trackblock-log.json");

// Ensure log file exists
if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, JSON.stringify([{ init: "true" }], null, 2));
    console.log("✅ Log file created");
}

// ---------- HTTPS enforcement middleware ----------
app.use((req, res, next) => {
    // Allow HTTP ONLY for /data endpoint (for SIM7600)
    if (req.path === "/data") return next();

    // Reject any other HTTP request and force redirect to HTTPS
    if (req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("https://" + req.headers.host + req.url);
    }

    next();
});

// ---------- Root health check ----------
app.get("/", (req, res) => {
    res.status(200).send("✅ Trackblock server is live & healthy!");
});

// ---------- Return full logs ----------
app.get("/logs", (req, res) => {
    const logs = JSON.parse(fs.readFileSync(logFile));
    res.json(logs);
});

// ---------- DATA INGEST ENDPOINT ----------
app.post("/data", (req, res) => {
    try {
        const payload = req.body || {};

        // Add timestamp field server side
        payload.receivedAt = new Date().toISOString();

        // Read existing log
        const existing = JSON.parse(fs.readFileSync(logFile));

        // Append new entry
        existing.push(payload);

        // Save back to file
        fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));

        console.log("📥 New payload received:", payload);

        res.status(200).json({
            status: "success",
            message: "Data received",
            received: payload,
        });
    } catch (err) {
        console.error("❌ Error handling payload:", err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// ---------- Start server ----------
app.listen(PORT, () => {
    console.log(`🚀 Trackblock ingest running on port ${PORT}`);
});
