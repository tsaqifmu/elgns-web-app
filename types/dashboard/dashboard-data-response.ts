export interface WorkOrderData {
  _id: string;
  noInvoice: string;
  tglMasuk: string; // Tanggal masuk dalam format ISO string. Gunakan `Date` jika diperlukan.
  tglKeluar: string; // Tanggal keluar dalam format ISO string. Gunakan `Date` jika diperlukan.
  totalBaju: number;
  totalCelana: number;
  terbayar: string;
  tagihan: string;
  totalBayar: string;
  status: string;
}
