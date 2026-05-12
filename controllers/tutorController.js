import Tutor from "../models/Tutor.js";


export const createTutor = async (req, res) => {
  try {

    const tutor = await Tutor.create(req.body);

    res.status(201).json(tutor);

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};


export const getTutors = async (req, res) => {
  try {

    const tutors = await Tutor.find();

    res.json(tutors);

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};

export const deleteTutor = async (req, res) => {
  try {

    await Tutor.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Tutor deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};