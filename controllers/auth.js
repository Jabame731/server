import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { createError } from '../utils/error.js';

//register
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      courseName: req.body.courseName,
      year: req.body.year,
      semester: req.body.semester,
    });

    await newUser.save();
    res.status(200).send('User has been created');
  } catch (err) {
    next(err);
  }
};

//login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not Found'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong Password or Username'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRETS
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true, //doesnt allow any client to reach any cookie
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
