import * as z from "zod";
const UpdateTeacherDTO = z.object({
  name: z.string(),
  house_id: z.int(),
});
export default UpdateTeacherDTO;
