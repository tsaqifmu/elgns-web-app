import { z } from "zod";

export const adminSchema = z.object({
  username: z.string().min(1, {
    message: "Nama customer tidak boleh kosong ",
  }),
  email: z.string().email().min(1, {
    message: "Email tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
  phoneNumber: z.string().min(10, {
    message: "Nomor hp minimal 10 angka",
  }),
  role: z.string().min(1, {
    message: "Status tidak boleh kosong",
  }),
});
