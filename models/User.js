import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    courseName: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
