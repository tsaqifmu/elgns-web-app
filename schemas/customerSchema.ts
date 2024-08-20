import { z } from "zod";

export const customerSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.number().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  adress: z.string().min(2, {
    message: "Adress must be at least 2 characters.",
  }),
  regency: z.string().min(2, {
    message: "Regency must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  statusDescription: z.string().min(2, {
    message: "StatusDescription must be at least 2 characters.",
  }),
});
