import { z } from "zod";

export const productionOverviewSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  notes: z.string(),
  invoice: z.string().min(1, {
    message: "Invoice tidak boleh kosong",
  }),
  password: z.string(),
  imageFile: z.instanceof(File).nullable(),
  cdrFile: z.instanceof(File).nullable(),
  type: z.string().min(1, {
    message: "Jenis tidak boleh kosong.",
  }),
});
