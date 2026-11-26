
import express from "express";
import students from "../data/students.js";

const router = express.Router();

// GET all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID"
    });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});

// POST create student
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    !Number.isInteger(age) ||
    age <= 0 ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return res.status(400).json({
      message: "Please provide valid name, age and course"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1,
    name: name.trim(),
    age,
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent
  });
});

// PUT update student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID"
    });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, age, course } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    !Number.isInteger(age) ||
    age <= 0 ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return res.status(400).json({
      message: "Please provide valid name, age and course"
    });
  }

  student.name = name.trim();
  student.age = age;
  student.course = course.trim();

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

// DELETE student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: "Invalid student ID"
    });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

export default router;
