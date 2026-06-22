import "./config/env.js"; // MUST BE FIRST (loads .env properly)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import trialRoutes from "./routes/trialRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";

// Optional: fix Mongo DNS issues
dns.setDefaultResultOrder("ipv4first");

const app = express();

/* ================= SECURITY CHECK ================= */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/trials", trialRoutes);
app.use("/api/tutors", tutorRoutes);

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

/* ================= DB CONNECT ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* ================= SAFE ENV CHECK ================= */
console.log("Stripe Loaded:", !!process.env.STRIPE_SECRET_KEY);