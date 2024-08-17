import { z } from "zod";

export const produksiOverviewSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  adress: z.string().min(2, {
    message: "Adress must be at least 2 characters.",
  }),
  notes: z.string().min(2, {
    message: "Notes must be at least 2 characters.",
  }),
  invoice: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  dateOfEntry: z.string().min(2, {
    message: "StatusDescription must be at least 2 characters.",
  }),
  dateOfExit: z.string().min(2, {
    message: "StatusDescription must be at least 2 characters.",
  }),
  jenis: z.string().min(2, {
    message: "Jenis must be at least 2 characters.",
  }),
});
