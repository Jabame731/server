import express from 'express';
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubject,
  updateSubject,
} from '../controllers/subject.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:semesterid', verifyAdmin, createSubject);

//UPDATE
router.put('/:id', verifyAdmin, updateSubject);

//DELETE
router.delete('/:id/:semesterid', verifyAdmin, deleteSubject);

//GET
router.get('/:id', getSubject);

//GETALL
router.get('/', getAllSubject);

export default router;
