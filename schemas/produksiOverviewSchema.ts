import { z } from "zod";

export const productionOverviewSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  notes: z.string(),
  invoice: z.string().min(1, {
    message: "Invoice harus diisi",
  }),
  dateOfEntry: z.date(),
  dateOfExit: z.date(),
  imageFile: z.instanceof(File).optional(),
  cdrFile: z.instanceof(File).optional(),
  type: z.string().min(1, {
    message: "Jenis harus diisi.",
  }),
});
