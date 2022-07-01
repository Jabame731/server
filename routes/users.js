import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('hello user, you are login');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('hello user, you are login and you can delete your acc');
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello ADMIN, you are login and ALL delete your accs');
// });

//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyAdmin, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GETALL
router.get('/', verifyAdmin, getAllUser);

export default router;
