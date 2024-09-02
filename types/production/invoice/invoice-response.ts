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
    noInvoice?: string;
    tabelInvoice1?: InvoiceTableItemResponse[];
    tabelInvoice2?: InvoiceTableTotalResponse;
  };
}

export const mapInvoiceResponse = (response: InvoiceResponse): Invoice => {
  return {
    invoices: mapInvoiceItemResponse(response.message.tabelInvoice1),
    total: mapInvoiceTableTotalResponseToInvoiceTableTotal(
      response.message.tabelInvoice2,
    ),
  };
};
