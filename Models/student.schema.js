import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentName: String,
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
  previousMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
