import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    maxSize: {
      type: Number,
      required: true,
      min: 1
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);