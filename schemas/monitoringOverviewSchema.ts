import { z } from "zod";

export const monitoringOverviewSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  notes: z.string(),
  invoice: z.string().min(1, {
    message: "Invoice harus diisi",
  }),
  type: z.string().min(1, {
    message: "Jenis harus diisi.",
  }),
  dateIn: z.date().nullable(),
  dateOut: z.date().nullable(),
  imageFile: z.instanceof(File).nullable(),
  cdrFile: z.instanceof(File).nullable(),
  proofFile: z.instanceof(File).nullable(),
});
