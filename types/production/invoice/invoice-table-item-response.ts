import { InvoiceTableItem } from "./invoice-table-item";

export interface InvoiceTableItemResponse {
  _id: string;
  jenis: string;
  jumlah: number;
  harga: number;
  total: number;
}

export const mapInvoiceItemResponse = (
  invoices?: InvoiceTableItemResponse[],
): InvoiceTableItem[] => {
  if (!invoices) return [];

  return invoices.map((invoice) => {
    const { _id, jenis, jumlah, harga, total } = invoice;

    return {
      id: _id,
      type: jenis,
      quantity: jumlah,
      price: harga,
      total,
    };
  });
};
