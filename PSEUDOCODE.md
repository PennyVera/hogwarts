# Pseudocode for endpoints

## GET /:resource

1. Get all records for the selected resource from the database.
2. Return the records as JSON.
3. Return a database error if the request fails.

This pattern is used by `GET /houses`, `GET /teachers`, `GET /students`, and
`GET /courses`.

## GET /:resource/:id

1. Get the `id` from the URL.
2. Find the corresponding record in the database.
3. If the record does not exist, return 404.
4. Otherwise, return the record as JSON.

This pattern is used by `GET /houses/:id`, `GET /teachers/:id`,
`GET /students/:id`, and `GET /courses/:id`.

## POST /:resource

1. Get the information from the request body.
2. Create a new record in the database.
3. Return the new record with status 201.
4. Return a database error if creation fails.

This pattern is used by `POST /teachers`, `POST /students`, and
`POST /courses`. Houses does not have a POST endpoint.

## PUT /:resource/:id

1. Get the `id` from the URL and the updated information from the request body.
2. Update the record in the database.
3. If the record does not exist, return 404.
4. Otherwise, return the updated record as JSON.

This pattern is used by `PUT /teachers/:id`, `PUT /students/:id`, and
`PUT /courses/:id`.

## DELETE /:resource/:id

1. Get the `id` from the URL.
2. Delete the record from the database.
3. If the record does not exist, return 404.
4. Otherwise, return a message confirming that the record was deleted.

This pattern is used by `DELETE /teachers/:id`, `DELETE /students/:id`, and
`DELETE /courses/:id`. Houses does not have a DELETE endpoint.

## Courses: special endpoints

### PUT /courses/:courseId/teacher

1. Get the course ID from the URL and the teacher ID from the request body.
2. Change the teacher assigned to the course.
3. If the course or teacher does not exist, return 404.
4. Otherwise, return the updated course.

### POST /courses/:courseId/students

1. Get the course ID from the URL and the student ID from the request body.
2. Add the student to the course.
3. If the course or student does not exist, return 404.
4. If the student is already enrolled, return 409.
5. Otherwise, return the new enrollment with status 201.

### DELETE /courses/:courseId/students/:studentId

1. Get the course ID and student ID from the URL.
2. Remove the student from the course.
3. If the enrollment does not exist, return 404.
4. Otherwise, return the removed enrollment.
