import { z } from "zod";

export const customerSchema = z.object({
  username: z.string().min(1, {
    message: "Nama customer tidak boleh kosong",
  }),
  brand: z.string().min(1, {
    message: "Brand tidak boleh kosong",
  }),
  phoneNumber: z.string().min(10, {
    message: "Nomor hp minimal 10 angka",
  }),
  regency: z.string().min(1, {
    message: "Alamat kabupaten tidak boleh kosong",
  }),
  status: z.string().min(1, {
    message: "Status tidak boleh kosong",
  }),
  statusDescription: z.string().min(1, {
    message: "Deskripsi status tidak boleh kosong",
  }),
});
