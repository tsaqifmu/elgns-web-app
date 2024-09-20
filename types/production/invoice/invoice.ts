import {
  InvoiceTableItem,
  mapInvoiceTableItemToSend,
} from "./invoice-table-item";
import { InvoiceTableTotal } from "./invoice-table-total";

export interface Invoice {
  name: string;
  phoneNumber: string;
  type: string;
  invoiceNumber: string;
  dateOfEntry: string;
  dateOfExit: string;
  invoices: InvoiceTableItem[];
  total: InvoiceTableTotal;
}

export const mapInvoiceToInvoiceToSend = (invoice: Invoice) => {
  const {
    totalPrice,
    initialDeposit,
    downPayment,
    discount,
    paid,
    totalFinal,
  } = invoice.total;

  return {
    tabelInvoice1: mapInvoiceTableItemToSend(invoice.invoices),
    tabelInvoice2: {
      totalHarga: totalPrice,
      depositAwal: initialDeposit,
      uangMuka: downPayment,
      potongan: discount,
      terbayar: paid,
      totalDibayar: totalFinal,
    },
  };
};
