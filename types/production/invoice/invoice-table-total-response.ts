import { InvoiceTableTotal } from "./invoice-table-total";

export interface InvoiceTableTotalResponse {
  totalHarga: number;
  depositAwal: number;
  uangMuka: number;
  potongan: number;
  totalDibayar: number;
}

export const mapInvoiceTableTotalResponseToInvoiceTableTotal = (
  invoiceTableTotal?: InvoiceTableTotalResponse,
): InvoiceTableTotal => {
  return {
    totalPrice: invoiceTableTotal?.totalHarga ?? 0,
    initialDeposit: invoiceTableTotal?.depositAwal ?? 0,
    downPayment: invoiceTableTotal?.uangMuka ?? 0,
    discount: invoiceTableTotal?.potongan ?? 0,
    totalFinal: invoiceTableTotal?.totalDibayar ?? 0,
  };
};
