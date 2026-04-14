import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "student", // student | tutor | admin
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);