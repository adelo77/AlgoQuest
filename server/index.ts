import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { storage } from "./storage";

// Set development mode
process.env.NODE_ENV = "development";

const app = express();

// Basic middleware
app.use(express.json());

// Test endpoint
app.get('/ping', (_req, res) => {
  res.json({ status: 'ok' });
  log('Ping endpoint hit successfully');
});


// Create default user and setup routes
(async () => {
  try {
    log("Starting server...");

    // Create default user
    const defaultUser = await storage.createUser({ username: "default" });
    log(`Created default user: ${defaultUser.id}`);

    // Setup routes
    const server = await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });


    // Setup Vite (development only)
    await setupVite(app, server);


    // Start server
    server.listen(5000, "0.0.0.0", () => {
      log("Server running on port 5000");
    });

  } catch (error) {
    log(`Server failed to start: ${error}`);
    process.exit(1);
  }
})();