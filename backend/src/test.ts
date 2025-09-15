import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for everything
app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Login route
app.post("/auth/login", (req, res) => {
  console.log("Login request received:", req.body);
  res.json({
    token: "test-token",
    user: {
      id: "1",
      email: req.body.email,
      role: "ADMIN",
      tenant: {
        id: "1",
        name: "Acme",
        slug: "acme",
        plan: "FREE",
      },
    },
  });
});

const PORT = 5000;
app
  .listen(PORT, () => {
    console.log(`Test server running on ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });
