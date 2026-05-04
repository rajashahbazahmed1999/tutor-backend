import Group from "../models/Group.js";
import User from "../models/User.js";

// ✅ Create group
export const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("students");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Add student to group
export const addStudent = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // prevent duplicate student
    if (group.students.includes(req.body.userId)) {
      return res.status(400).json({ msg: "Student already in group" });
    }

    // check group limit
    if (group.students.length >= group.maxSize) {
      return res.status(400).json({ msg: "Group is full" });
    }

    // optional: verify user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    group.students.push(req.body.userId);
    await group.save();

    res.json(group);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Remove student from group
export const removeStudent = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    group.students = group.students.filter(
      id => id.toString() !== req.body.userId
    );

    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete group
export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    res.json({ msg: "Group deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};