import * as teachersRepository from "../repositories/teachers.repository.js";
// get all teachers
export const getAllTeachers = async (req, res) => {
  // get all teachers from the database
  try {
    // get allTeachers from teachersRepository
    const allTeachers = await teachersRepository.getAllTeachers();
    // return the teachers as json
    res.json(allTeachers);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// get single teacher
export const getSingleTeacher = async (req, res) => {
  // get the chosen teachers id from the request params
  try {
    // get the teacher from teachersRepository
    const singleTeacher = await teachersRepository.getSingleTeacher(req.params.id);
    // if the teacher does not exist, return a 404 status code
    if (singleTeacher.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(singleTeacher.rows[0]);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

// create a new teacher
export const createTeacher = async (req, res) => {
  // get the name and house_id from the request body
  try {
    // create the new teacher in the database using teachersRepository
    const newTeacher = await teachersRepository.createTeacher(req, res);
    res.status(201).json(newTeacher);
    // if there is an error, return a 500 status code with an error message
  } catch (err) {
    res.status(500).json({ error: "database error", code: err.code });
  }
};

export const updateTeacher = async (req, res) => {
  // get chosen teacher id
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

export const deleteTeacher = async (req, res) => {
  // get chosen teachers id
  const { id } = req.params;
  // delete the teacher from the database
  try {
    const result = await teachersRepository.deleteTeacher(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    // return a success message
    return res.status(200).json({ message: "Teacher deleted successfully" });
    // return an error message
  } catch (err) {
    return res.status(500).json({
      error: "database error",
      code: err.code,
    });
  }
};
