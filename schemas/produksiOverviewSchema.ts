import { z } from "zod";

export const produksiOverviewSchema = z.object({
  invoice: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  dateOfEntry: z.date(),
  dateOfExit: z.date(),
  jenis: z.string().min(2, {
    message: "Jenis must be at least 2 characters.",
  }),
});
