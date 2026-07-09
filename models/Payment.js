import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema(
  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    


    amount: {
      type: Number,
      required: true
    },


    method: {
      type: String,
      enum: ["stripe", "manual"],
      default: "stripe"
    },


    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },


    transactionId: {
      type: String
    }

  },
  {
    timestamps: true
  }
);



const Payment = mongoose.model(
  "Payment",
  paymentSchema
);



export default Payment;