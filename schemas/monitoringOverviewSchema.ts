import { z } from "zod";

export const monitoringOverviewSchema = z.object({
  name: z.string(),
  invoice: z.string(),
  password: z.string(),
  phoneNumber: z.string(),
  notes: z.string(),
  type: z.string(),
  dateIn: z.date().optional(),
  dateOut: z.date().optional(),
  imageFile: z.any().optional(),
  cdrFile: z.any().optional(),
  proofFile: z.any().optional(),
  pdfFile: z.any().optional(),
});
