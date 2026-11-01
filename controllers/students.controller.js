import * as studentsRepository from "../repositories/students.repository.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await studentsRepository.getAllStudents();
    res.json(allStudents);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Get a single student
export const getSingleStudent = async (req, res) => {
  try {
    const singleStudent = await studentsRepository.getSingleStudent(req.params.id);
    if (singleStudent.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleStudent.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const newStudent = await studentsRepository.createStudent(req, res);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  // Get the selected student ID
  const { id } = req.params;
  try {
    const result = await studentsRepository.deleteStudent(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  // Get the selected student ID and updated values from the request
  const { id } = req.params;
  const { name, house_id, semester } = req.body;

  try {
    const result = await studentsRepository.updateStudent(id, name, house_id, semester);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};
