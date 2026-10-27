import express from "express";

import { pool } from "./db.js";
import * as housesRepository from "./repositories/houses.repository.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// root route message
app.get("/", (req, res) => {
  res.send("welcome to Hogwarts API");
});

// ---- Houses ---- //
// get all houses
app.get("/houses", async (req, res) => {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error", code: err.code });
  }
});

// get specific house
app.get("/houses/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM houses WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});

// ---- Teachers ---- //

// get all teachers
app.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teachers");

    console.table(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error", code: err.code });
  }
});

// get specific teacher
app.get("/teachers/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM teachers WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});
// ---- students ---- //

// get all students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");

    console.table(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error", code: err.code });
  }
});

// get specific student
app.get("/students/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT * FROM students WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});
