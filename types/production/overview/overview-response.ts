import { Overview } from "./overview";

export interface OverviewResponse {
  error: false;
  message: {
    _id: string;
    custName: string;
    alamat: string;
    noHp: string;
    desainImgUrl: string;
    desainCdrUrl: string;
    catatan: string;
    jenis: string;
    noInvoice: string;
  };
}

export const mapOverviewResponse = (response: OverviewResponse): Overview => {
  return {
    id: response.message._id,
    customerName: response.message.custName,
    address: response.message.alamat,
    phoneNumber: response.message.noHp,
    imgUrl: response.message.desainImgUrl,
    cdrUrl: response.message.desainCdrUrl,
    notes: response.message.catatan,
    type: response.message.jenis,
    invoiceNumber: response.message.noInvoice,
  };
};
