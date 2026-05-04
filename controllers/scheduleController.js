import Schedule from "../models/Schedule.js";

// ✅ Create Schedule
export const createSchedule = async (req, res) => {
  try {
    const { groupId, day, startTime, endTime } = req.body;

    // 🔥 Prevent time conflict
    const conflict = await Schedule.findOne({
      groupId,
      day,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    if (conflict) {
      return res.status(400).json({ msg: "Time slot conflict" });
    }

    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Get All Schedules
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("groupId");

    res.json(schedules);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Get Single Schedule
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate("groupId");

    if (!schedule) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    res.json(schedule);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Update Schedule
export const updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Delete Schedule
export const deleteSchedule = async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    res.json({ msg: "Schedule deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};