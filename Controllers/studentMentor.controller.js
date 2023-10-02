import Student from "../Models/student.schema.js";
import Mentor from "../Models/mentor.schema.js";
import mongoose from "mongoose";
export const createStudent = async(req, res) => {
   try {
     const student = new Student(req.body);
     await student.save();
     res.status(201).json(student);
   } catch (error) {
     res.status(500).json({ error: "Could not create student" });
   }
}
export const getStudent = async (req, res) => {
    try {
        const student = await Student.find()
         res.status(200).json( student );
    } catch (error) {
        res.status(500).json({ error: "error in get student" });
    }
}

export const deleteStudentById = async (req, res) => {
  try {
      const studentId = req.params.studentId;
      const deletedStudent = await Student.findByIdAndRemove(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
};

export const createMentor = async (req, res) => {
    try {
      const mentor = new Mentor(req.body);
      await mentor.save();
      res.status(201).json(mentor);
    } catch (error) {
      res.status(500).json({ error: "Could not create mentor" });
    }
}


export const getMentor = async (req, res) => {
  try {
    const mentor= await Mentor.find();
    res.status(200).json( mentor);
  } catch (error) {
    res.status(500).json({ error: "error in get mentor" });
  }
};


export const deleteMentorById = async (req, res) => {
    try {
      const mentorId = req.params.mentorId;
        const deletedMentor = await Mentor.findByIdAndRemove(mentorId);
      if (!deletedMentor) {
        return res.status(404).json({ error: "mentor not found" });
      }

      res.status(200).json({ message: "mentor deleted successfully", deletedMentor });
    } catch (error) {
      res.status(500).json({ error: "Could not delete mentor" });
    }
}
export const assignStudentToMentor = async (req,res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      if (!mentor) {
        return res.status(404).json({ error: "Mentor not found" });
      }

      const student = await Student.findByIdAndUpdate(
        req.params.studentId,
        { mentor: mentor._id },
        { new: true }
      );

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: "Could not assign student to mentor" });
    }
}

export const mentorToStudent = async(req,res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      if (!mentor) {
        return res.status(404).json({ error: "Mentor not found" });
      }

      const studentIds = req.body.studentIds; 

      await Student.updateMany(
        { _id: { $in: studentIds } },
        { mentor: mentor._id }
      );

      res
        .status(200)
        .json({ message: "Students assigned to mentor successfully"});
    } catch (error) {
      res.status(500).json({ error: "Could not assign students to mentor" });
    }
}


export const changeMentorForStudent = async(req, res) => {
     try {
       const mentor = await Mentor.findById(req.params.mentorId);
       if (!mentor) {
         return res.status(404).json({ error: "Mentor not found" });
       }

       const student = await Student.findByIdAndUpdate(
         req.params.studentId,
         { mentor: mentor._id },
         { new: true }
       );

       if (!student) {
         return res.status(404).json({ error: "Student not found" });
       }

         res.status(200).json({ message:"change mentor for a particular student",student });
     } catch (error) {
       res
         .status(500)
         .json({ error: "Could not assign/change mentor for student" });
     }
}

export  const showAllStudents =async (req, res) => {
     try {
       const mentorId = req.params.mentorId;
       const mentor = await Mentor.findById(mentorId).populate("students");

       if (!mentor) {
         return res.status(404).json({ error: "Mentor not found" });
       }

       res.status(200).json({ students: mentor.students });
     } catch (error) {
       res
         .status(500)
         .json({ error: "Could not retrieve students for this mentor" });
     }
}


export const showPrevMentor = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId).populate("mentor");

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      const prevMentorId = student.mentor;

      if (!prevMentorId) {
        return res.status(404).json({ error: "No previous mentor found" });
      }

      // Populate the students field of the Mentor document
      const prevMentor = await Mentor.findById(prevMentorId).populate(
        "students"
      );

      if (!prevMentor) {
        return res.status(404).json({ error: "Previous mentor not found" });
      }

      res.status(200).json({ previousMentor: prevMentor });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not retrieve previous mentor for this student" });
    }
}