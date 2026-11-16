import * as z from "zod";

export const CreateTeacherDTO = z.object({
  name: z.string(),
  house_id: z.int(),
});

export const UpdateTeacherDTO = z.object({
  name: z.string(),
  house_id: z.int(),
});
