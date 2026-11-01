import express from "express";

// import routers
import { housesRouter } from "./routes/houses.router.js";
import { teachersRouter } from "./routes/teachers.router.js";
import { studentsRouter } from "./routes/students.router.js";
import { coursesRouter } from "./routes/courses.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route message
app.get("/", (req, res) => {
  res.send("welcome to Hogwarts API");
});

// ---- Houses ---- //
app.use("/houses/", housesRouter);

// ---- Teachers ---- //
app.use("/teachers/", teachersRouter);

// ---- Students ---- //
app.use("/students/", studentsRouter);

// ---- Courses ---- //
app.use("/courses/", coursesRouter);

export default app;
