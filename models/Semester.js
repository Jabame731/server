import mongoose from 'mongoose';

const SemesterSchema = new mongoose.Schema({
  collegeYear: {
    type: String,
    required: true,
  },
  collegeCourse: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Semester', SemesterSchema);
