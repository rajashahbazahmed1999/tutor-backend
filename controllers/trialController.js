import Trial from "../models/Trial.js";

// Start trial (3 days default)
export const startTrial = async (req, res) => {
  const trial = await Trial.create({
    userId: req.user.userId,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  });

  res.json(trial);
};

// Get my trial
export const getMyTrial = async (req, res) => {
  const trial = await Trial.findOne({ userId: req.user.userId });
  res.json(trial);
};

// Admin: get all trials
export const getAllTrials = async (req, res) => {
  const trials = await Trial.find().populate("userId");
  res.json(trials);
};

// Convert trial to paid
export const convertTrial = async (req, res) => {
  const trial = await Trial.findOne({ userId: req.body.userId });

  if (!trial) return res.status(404).json({ msg: "Trial not found" });

  trial.status = "converted";
  await trial.save();

  res.json(trial);
};