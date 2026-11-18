import * as z from "zod";

const teacherFields = {
  name: z.string(),
  house_id: z.int(),
  employment_start: z.iso.date().nullable().default(null),
  currently_active: z.boolean().default(false),
  deceased: z.boolean().default(false),
};

function validateEmployment({ employment_start, currently_active }, context) {
  const today = new Date().toISOString().slice(0, 10);

  if (currently_active && (!employment_start || employment_start > today)) {
    context.addIssue({
      code: "custom",
      message: "An active teacher must have started on or before today",
      path: ["currently_active"],
    });
  }
}

export const CreateTeacherDTO = z.object(teacherFields).superRefine(validateEmployment);

export const UpdateTeacherDTO = z.object(teacherFields).superRefine(validateEmployment);
