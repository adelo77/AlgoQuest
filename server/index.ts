import express from "express";
import { setupVite, log } from "./vite";
import { createServer } from "http";

// Use development mode
process.env.NODE_ENV = "development";

log("Starting server in development mode...");

const app = express();
const server = createServer(app);

// Basic middleware
app.use(express.json());

// Debug logging middleware
app.use((req, _res, next) => {
  log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (_req, res) => {
  log('Health check endpoint hit');
  res.json({ status: 'healthy' });
});

// Test endpoint with detailed logging
app.get('/ping', (_req, res) => {
  log('Ping endpoint hit successfully');
  res.json({ status: 'ok' });
});

// Startup procedure
(async () => {
  try {
    log("Configuring server...");

    // Setup Vite dev server
    log("Setting up Vite development server...");
    await setupVite(app, server);
    log("Vite development server configured");

    // Start server - explicitly binding to 0.0.0.0
    server.listen(5000, "0.0.0.0", () => {
      log("Server successfully started and listening on port 5000");
      log("Access the application at http://localhost:5000");
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    console.error("Detailed error:", error);
    process.exit(1);
  }
})();