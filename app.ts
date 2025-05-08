import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import cors, { CorsOptions } from "cors";

// Import routes and middlewares
import indexRouter from "./src/routes/index.router";
import { errorHandler } from "./src/middlewares/error.middleware";
import connectDB from "./config/db.config";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS for cross-origin requests
const allowedOrigins = [
  "http://localhost:3000", // frontend local
  "http://localhost:3001",
  "https://nodetask-tqy8.onrender.com", // backend live URL
];
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};
app.use(cors(corsOptions));

// Log HTTP requests in development mode
app.use(morgan("dev"));

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Global Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Mount base API router
app.use("/api", indexRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("App Works Properly");
});

// Start the server
const PORT = process.env.PORT ?? 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
