import express from "express";
import {
  createStudent,
  createMentor,
  assignStudentToMentor,
  mentorToStudent,
  changeMentorForStudent,
  showAllStudents,
  getStudent,
  getMentor,
  showPrevMentor,
  deleteMentorById,
  deleteStudentById,
} from "../Controllers/studentMentor.controller.js";


const router = express.Router();


router.post("/students", createStudent);
router.get("/getstudents", getStudent);
router.delete("/deletestudent/:studentId", deleteStudentById);
router.post("/mentors", createMentor);
router.get("/getmentors", getMentor);
router.delete("/deletementor/:mentorId", deleteMentorById);
router.post("/assign-student/:mentorId/:studentId", assignStudentToMentor);
router.post("/add-students-to-mentor/:mentorId", mentorToStudent);
router.put("/assign-mentor/:studentId/:mentorId", changeMentorForStudent);
router.get("/students-for-mentor/:mentorId", showAllStudents);
router.get("/previous-mentor/:studentId", showPrevMentor);
export default router