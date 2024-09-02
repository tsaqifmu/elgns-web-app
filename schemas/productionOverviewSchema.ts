import { z } from "zod";

export const productionOverviewSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  notes: z.string(),
  invoice: z.string().min(1, {
    message: "Invoice harus diisi",
  }),
  imageFile: z.instanceof(File).nullable(),
  cdrFile: z.instanceof(File).nullable(),
  type: z.string().min(1, {
    message: "Jenis harus diisi.",
  }),
});
