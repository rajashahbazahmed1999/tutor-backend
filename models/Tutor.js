import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    price: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;