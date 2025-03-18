import express from "express";
import { log, serveStatic } from "./vite";
import { createServer } from "http";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

// Force production mode for stability
process.env.NODE_ENV = "production";

log("Starting server in production mode...");

const app = express();
const server = createServer(app);

// Basic middleware
app.use(express.json());

// Test endpoint with detailed logging
app.get('/ping', (_req, res) => {
  log('Ping endpoint hit successfully');
  res.json({ status: 'ok' });
});

// Startup procedure
(async () => {
  try {
    log("Configuring server...");

    // Build client files if needed
    log("Building client files...");
    const execPromise = promisify(exec);
    await execPromise('npm run build');
    log("Client build completed");

    log("Setting up static file serving...");
    serveStatic(app);
    log("Static file serving configured");

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