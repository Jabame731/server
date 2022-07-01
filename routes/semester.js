import express from 'express';
import {
  createSemester,
  deleteSemester,
  getAllSemester,
  getSemester,
  updateSemester,
} from '../controllers/semester.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createSemester);

//UPDATE
router.put('/:id', verifyAdmin, updateSemester);

//DELETE
router.delete('/:id', verifyAdmin, deleteSemester);

//GET
router.get('/:id', getSemester);

//GETALL
router.get('/', getAllSemester);

export default router;
