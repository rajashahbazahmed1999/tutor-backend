import dotenv from "dotenv";

dotenv.config();

console.log("ENV STATUS:", {
  MONGO_URI: !!process.env.MONGO_URI,
  STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
  JWT_SECRET: !!process.env.JWT_SECRET
});