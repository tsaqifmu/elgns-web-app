import { z } from "zod";

export const clothSchema = z.object({
  clothName: z.string().min(1, {
    message: "Nama bahan tidak boleh kosong ",
  }),
  stock: z.string().min(1, {
    message: "stock tidak boleh kosong",
  }),
  color: z.string().min(1, {
    message: "Warna bahan tidak boleh kosong",
  }),
});
