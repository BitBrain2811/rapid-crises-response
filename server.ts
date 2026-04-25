import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "Emergency Response System is Online", timestamp: new Date().toISOString() });
  });

  // Proxy for Alerts (Simulating the user request for POST/GET /alerts)
  // In a real Firebase app, we often use the Client SDK directly, 
  // but we'll include these as requested for standard API access.
  app.get("/api/alerts", (req, res) => {
    // This will be handled by the client-side Firebase logic primarily, 
    // but can be used as a backup endpoint if needed.
    res.json({ message: "Use the real-time websocket/firestore sync for live data." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CrisisControl Server running on http://localhost:${PORT}`);
  });
}

startServer();
