import * as teachersRepository from "../repositories/teachers.repository.js";

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await teachersRepository.getAllTeachers();
    res.json(allTeachers);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Get a single teacher
export const getSingleTeacher = async (req, res) => {
  try {
    const singleTeacher = await teachersRepository.getSingleTeacher(req.params.id);
    if (singleTeacher.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleTeacher.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const newTeacher = await teachersRepository.createTeacher(req, res);
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
  // Get the selected teacher ID and updated values from the request
  const { id } = req.params;
  const { name, house_id } = req.body;

  try {
    const result = await teachersRepository.updateTeacher(id, name, house_id);

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

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  // Get the selected teacher ID
  const { id } = req.params;
  try {
    const result = await teachersRepository.deleteTeacher(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};
