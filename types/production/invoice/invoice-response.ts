import { Invoice } from "./invoice";
import {
  InvoiceTableItemResponse,
  mapInvoiceItemResponse,
} from "./invoice-table-item-response";
import {
  InvoiceTableTotalResponse,
  mapInvoiceTableTotalResponseToInvoiceTableTotal,
} from "./invoice-table-total-response";

export interface InvoiceResponse {
  error: boolean;
  message: {
    _id: string;
    custName: string;
    noHp: string;
    catatan: string;
    jenis?: string;
    noInvoice?: string;
    tglMasuk?: string;
    tglKeluar?: string;
    tabelInvoice1?: InvoiceTableItemResponse[];
    tabelInvoice2?: InvoiceTableTotalResponse;
  };
}

export const mapInvoiceResponse = (response: InvoiceResponse): Invoice => {
  return {
    name: response.message.custName,
    phoneNumber: response.message.noHp,
    type: response.message.jenis ?? "",
    invoiceNumber: response.message.noInvoice ?? "",
    dateOfEntry: response.message.tglMasuk ?? "",
    dateOfExit: response.message.tglKeluar ?? "",
    invoices: mapInvoiceItemResponse(response.message.tabelInvoice1),
    total: mapInvoiceTableTotalResponseToInvoiceTableTotal(
      response.message.tabelInvoice2,
    ),
  };
};
