import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

// Set development mode explicitly
process.env.NODE_ENV = "development";

const app = express();

// Basic middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test endpoint to verify server is running
app.get('/ping', (_req, res) => {
  res.json({ status: 'ok' });
  log('Ping endpoint hit successfully');
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    log("Starting server initialization...");

    // Create a default user since we're using in-memory storage
    const defaultUser = await storage.createUser({ username: "default" });
    log(`Created default user with ID: ${defaultUser.id}`);

    // Register API routes
    log("Registering API routes...");
    const server = await registerRoutes(app);
    log("API routes registered successfully");

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });

    const env = app.get("env");
    log(`Starting server in ${env} mode`);

    // Set up appropriate middleware based on environment
    if (env === "development") {
      log("Setting up Vite middleware...");
      await setupVite(app, server);
      log("Vite middleware setup complete");
    } else {
      log("Setting up static file serving...");
      serveStatic(app);
      log("Static file serving setup complete");
    }

    // Start the server
    const port = 5000;
    server.listen(port, "0.0.0.0", () => {
      log(`Server ready and listening on port ${port}`);
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    console.error("Detailed error:", error);
    process.exit(1);
  }
})();