// ============================
// Trackblock HTTP Proxy (for SIM7600)
// ============================

import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

// Target real HTTPS ingest server
const FORWARD_URL = "https://trackblock-server-production.up.railway.app/data";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Trackblock HTTP proxy is live (no TLS, no redirect)");
});

// Proxy endpoint
app.post("/data", async (req, res) => {
  try {
    console.log("📥 Incoming proxy payload:", req.body);

    const upstream = await fetch(FORWARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const responseText = await upstream.text();
    console.log("📤 Forwarded → HTTPS server response:", responseText);

    res.status(200).send("✅ Proxy delivered payload");
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).send("Proxy failed");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP proxy running on port ${PORT}`);
});
