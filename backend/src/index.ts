import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import healthRoutes from "./routes/health";
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes";
import tenantRoutes from "./routes/tenants";

dotenv.config();

const app = express();

// ✅ Dynamic CORS (works in dev + prod)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // set FRONTEND_URL in .env for Vercel
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());

// Routes
app.use(healthRoutes);
app.use("/auth", authRoutes);
app.use(noteRoutes);
app.use(tenantRoutes);

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("ERROR:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ✅ Only listen locally; on Vercel we export the app
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`================================`);
    console.log(`Server running on port ${PORT}`);
    console.log(
      `CORS enabled for ${process.env.FRONTEND_URL || "http://localhost:3000"}`
    );
    console.log(`Test: http://localhost:${PORT}/health`);
    console.log(`================================`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server closed");
    });
  });
}

// ✅ Export for Vercel serverless
export default app;
