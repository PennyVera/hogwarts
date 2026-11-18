import express from "express";

// import routers
import { router as housesRouter } from "./routes/houses.router.js";
import { router as teachersRouter } from "./routes/teachers.router.js";
import { router as studentsRouter } from "./routes/students.router.js";
import { router as coursesRouter } from "./routes/courses.router.js";
import { router as examsRouter } from "./routes/exams.router.js";
import { router as gradesRouter } from "./routes/grades.router.js";
import errorhandler from "./errorhandler/errorhandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route message
app.get("/", function (req, res) {
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

// ---- Exams ---- //
app.use("/exams/", examsRouter);

// ---- Grades ---- //
app.use("/grades/", gradesRouter);

// Error handler middleware
app.use(errorhandler);

export default app;
