import { z } from "zod";

export const monitoringOverviewSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  notes: z.string(),
  invoice: z.string().min(1, {
    message: "Invoice  tidak boleh kosong",
  }),
  type: z.string().min(1, {
    message: "Jenis  tidak boleh kosong",
  }),
  dateIn: z.date({ required_error: "Tanggal masuk tidak boleh kosong" }),
  dateOut: z.date().nullable(),
  imageFile: z.instanceof(File).nullable(),
  cdrFile: z.instanceof(File).nullable(),
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "File harus bertipe PDF",
    })
    .nullable(),
  proofFile: z.instanceof(File).nullable(),
});
