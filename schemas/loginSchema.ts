import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username tidak boleh kosong" })
    .email("Format Email salah"),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});
