import { z } from "zod";

export const fabricSchema = z.object({
  fabricName: z.string().min(1, {
    message: "Nama bahan tidak boleh kosong ",
  }),
  stock: z.coerce.number().min(1, {
    message: "stock tidak boleh kosong",
  }),
  color: z.string().min(1, {
    message: "Warna bahan tidak boleh kosong",
  }),
});
export const fabricUpdateStockSchema = z.object({
  stock: z.coerce.number(),
});
