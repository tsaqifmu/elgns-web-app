import {
  InvoiceTableItem,
  mapInvoiceTableItemToSend,
} from "./invoice-table-item";
import { InvoiceTableTotal } from "./invoice-table-total";

export interface Invoice {
  invoices: InvoiceTableItem[];
  total: InvoiceTableTotal;
}

export const mapInvoiceToInvoiceToSend = (invoice: Invoice) => {
  const { totalPrice, initialDeposit, downPayment, discount, totalFinal } =
    invoice.total;

  return {
    tabelInvoice1: mapInvoiceTableItemToSend(invoice.invoices),
    tabelInvoice2: {
      totalHarga: totalPrice,
      depositAwal: initialDeposit,
      uangMuka: downPayment,
      potongan: discount,
      totalDibayar: totalFinal,
    },
  };
};
