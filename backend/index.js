import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import { seedData } from "./config/seed.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import workflowRoutes from "./routes/workflowRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Connect to DB
  await connectDB();
  await seedData();

  const app = express();
  const httpServer = createServer(app);
  // Configure Socket.IO CORS explicitly instead of passing the cors module
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  const PORT = process.env.PORT || 3000;

  // Middlewares
  // Use default helmet protections. Do not reference undefined variables.
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Socket.io
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  // Attach io to request
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/patients", patientRoutes);
  app.use("/api/workflows", workflowRoutes);
  app.use("/api/incidents", incidentRoutes);
  app.use("/api/doctors", doctorRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date() });
  });

  // Vite middleware for development
  const isDev = process.env.NODE_ENV !== "production";
  console.log(`Starting in ${isDev ? 'development' : 'production'} mode`);

  if (isDev) {
    console.log("Initializing Vite middleware...");
    const vite = await createViteServer({
      root: path.resolve(__dirname, "../frontend"),
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicitly handle index.html for SPA if not handled by vite.middlewares
    app.get("*", async (req, res, next) => {
      // If the request is for an API or has an extension (likely a file), don't serve index.html
      if (req.originalUrl.startsWith('/api') || req.originalUrl.includes('.')) {
        return next();
      }
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, "../frontend/index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    // In production, serve the built frontend. Vite outputs to `dist` inside the frontend folder.
    const distPath = path.join(process.cwd(), "frontend", "dist");
    console.log(`Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Error Handlers
  app.use(notFound);
  app.use(errorHandler);

  httpServer.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});


