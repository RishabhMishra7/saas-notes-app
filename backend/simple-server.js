const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Hardcoded user
const hashedPassword =
  "$2a$10$X3qKfL9dCHr5i0M2MsW9YuGxH1Y3Kc2VfJY3oM8lB5w5Y4wUyVW8m"; // "password" hashed

app.post("/auth/login", async (req, res) => {
  console.log("Login attempt:", req.body);

  if (req.body.email === "admin@acme.test") {
    const token = jwt.sign(
      { id: "1", email: "admin@acme.test", role: "ADMIN", tenantId: "1" },
      "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: "1",
        email: "admin@acme.test",
        role: "ADMIN",
        tenant: {
          id: "1",
          name: "Acme Corporation",
          slug: "acme",
          plan: "FREE",
        },
      },
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Simple server running on 5000 - CORS ENABLED");
});
