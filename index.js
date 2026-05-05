import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import trialRoutes from "./routes/trialRoutes.js";
import dns from "dns";


dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/trials", trialRoutes);


app.get("/", (req, res) => {
  res.send("API Running");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});