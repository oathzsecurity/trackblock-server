/**
 * proxy.js
 * Lightweight HTTP-only endpoint for SIM7600 (no HTTPS, no redirect)
 */

const http = require("http");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const TARGET = process.env.UPSTREAM_URL || "http://localhost:3000/data"; // where we forward the payload

const PORT = process.env.PORT_PROXY || 8080;

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/data") {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", async () => {
      console.log("📩 Incoming device POST:", body);

      try {
        const upstream = await fetch(TARGET, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body
        });

        const text = await upstream.text();
        console.log("✅ Forwarded to upstream, response:", upstream.status, text);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, status: upstream.status }));
      } catch (err) {
        console.error("❌ Forwarding error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.toString() }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, () =>
  console.log(`🛰️  SIM7600 HTTP listener active on port ${PORT}`)
);
