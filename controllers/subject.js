import Semester from '../models/Semester.js';
import Subjects from '../models/Subjects.js';
import { createError } from '../utils/error.js';

//CREATE
export const createSubject = async (req, res, next) => {
  const semesterId = req.params.semesterid;
  const newSubject = new Subjects(req.body);

  try {
    const saveSubject = await newSubject.save();

    try {
      await Semester.findByIdAndUpdate(semesterId, {
        $push: { subjects: saveSubject._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveSubject);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateSubject = async (req, res, next) => {
  try {
    const updatedSubject = await Subjects.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteSubject = async (req, res, next) => {
  const semesterId = req.params.semesterid;

  try {
    await Subjects.findByIdAndDelete(req.params.id);
    try {
      await Semester.findByIdAndUpdate(semesterId, {
        $pull: { subjects: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Subject has been deleted');
  } catch (err) {
    next(err);
  }
};

//GET
export const getSubject = async (req, res, next) => {
  try {
    const subject = await Subjects.findById(req.params.id);

    res.status(200).json(subject);
  } catch (err) {
    next(err);
  }
};

//GETALL
export const getAllSubject = async (req, res, next) => {
  const failed = false;

  if (failed) return next(createError(401, 'You are not authenticated!.'));

  try {
    const subjects = await Subjects.find();
    res.status(200).json(subjects);
  } catch (err) {
    next(err);
  }
};
