import mongoose from 'mongoose';

const SubjectsSchema = new mongoose.Schema(
  {
    subjectEcode: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectTitle: {
      type: String,
      required: true,
    },
    subjectUnits: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Subjects', SubjectsSchema);
