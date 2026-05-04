const Payment = require("../models/Payment");

// Create payment (manual or online record)
export const createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.json(payment);
};

// Get all payments
export const getPayments = async (req, res) => {
  const payments = await Payment.find().populate("userId");
  res.json(payments);
};

// Update payment status (admin marks paid)
export const updatePayment = async (req, res) => {
  const updated = await Payment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Delete payment
export const deletePayment = async (req, res) => {
  await Payment.findByIdAndDelete(req.params.id);
  res.json({ msg: "Payment deleted" });
};