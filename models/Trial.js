import mongoose from "mongoose";

const trialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  status: {
    type: String,
    enum: ["active", "expired", "converted"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("Trial", trialSchema);