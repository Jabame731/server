import Semester from '../models/Semester.js';

//CREATE
export const createSemester = async (req, res, next) => {
  const newSemester = new Semester(req.body);

  try {
    const savedSemester = await newSemester.save();
    res.status(200).json(savedSemester);
  } catch (err) {
    res.status(err);
  }
};

//UPDATE
export const updateSemester = async (req, res, next) => {
  try {
    const updatedSemester = await Semester.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSemester);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deleteSemester = async (req, res, next) => {
  try {
    await Semester.findByIdAndDelete(req.params.id);
    res.status(200).json('Semester Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET
export const getSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findById(req.params.id);
    res.status(200).json(semester);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GETALL
export const getAllSemester = async (req, res, next) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (err) {
    next(err);
  }
};
