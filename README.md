# Hogwarts Course Management System

The API runs on `http://localhost:3000`.

## Endpoint tests

The `hogwarts-api-test` folder contains the endpoint requests for Bruno. Start
the API with `npm start`, open Bruno, and import or open this folder as a
collection. Select a request, check that its URL and request body contain the
desired IDs and values, and click **Send**. Run the requests in an order that
respects their data dependencies—for example, create a teacher or student
before using its ID in a course request.

## Endpoints

### Root

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns a welcome message. |

### Houses

| Method | Endpoint | Description |
|---|---|---|
| GET | `/houses` | Returns all houses. |
| GET | `/houses/:id` | Returns one house by ID. |

### Teachers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/teachers` | Returns all teachers. |
| GET | `/teachers/:id` | Returns one teacher by ID. |
| POST | `/teachers` | Creates a teacher. |
| PUT | `/teachers/:id` | Updates a teacher's name and house. |
| DELETE | `/teachers/:id` | Deletes a teacher and unassigns them from their courses. |

Teacher request body:

```json
{
  "name": "Minerva McGonagall",
  "house_id": 1,
  "employment_start": "1990-09-01",
  "currently_active": true,
  "deceased": false
}
```

### Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Returns all students. |
| GET | `/students/:id` | Returns one student by ID. |
| POST | `/students` | Creates a student. |
| PUT | `/students/:id` | Updates a student's name, house, and semester. |
| DELETE | `/students/:id` | Deletes a student. |

Student request body:

```json
{
  "name": "Harry Potter",
  "house_id": 1,
  "semester": 1,
  "birthday": "1980-07-31",
  "school_year": 1
}
```

### Courses

| Method | Endpoint | Description |
|---|---|---|
| GET | `/courses` | Returns all courses, including their `student_ids`. |
| GET | `/courses/:id` | Returns one course, including its `student_ids`. |
| POST | `/courses` | Creates a course with a teacher. |
| PUT | `/courses/:id` | Updates a course's name and teacher. |
| DELETE | `/courses/:id` | Deletes a course and its student relationships. |
| PUT | `/courses/:courseId/teacher` | Changes the teacher assigned to a course. |
| POST | `/courses/:courseId/students` | Adds a student to a course. |
| DELETE | `/courses/:courseId/students/:studentId` | Removes a student from a course. |

Course request body. `OWL` courses must be in school years 1-5, and `NEWT`
courses must be in school years 6-7:

```json
{
  "name": "Potions",
  "teacher_id": 5,
  "type": "core",
  "level": "OWL",
  "school_year": 1
}
```

Change a course teacher:

```json
{
  "teacher_id": 5
}
```

Add a student to a course:

```json
{
  "student_id": 6
}
```
