export interface CustomerData {
  alamatKabupaten: string;
  custName: string;
  jumlah: number;
  noInvoice: string;
  tglMasuk: string;
  _id: string;
}

export interface DateData {
  data: CustomerData[];
  date: string;
}
export interface TransformedData {
  date: string;
  total: number;
  data: CustomerData[];
}
