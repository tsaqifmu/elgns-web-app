import { ProductionOverview } from "./production-overview";

export interface ProductionOverviewResponse {
  error: false;
  message: {
    _id: string;
    custName: string;
    brand: string;
    noHp: string;
    desainImgUrl: string;
    desainCdrUrl: string;
    catatan: string;
    jenis: string;
    noInvoice: string;
    password: string;
  };
}

export const mapOverviewResponse = (
  response: ProductionOverviewResponse,
): ProductionOverview => {
  return {
    id: response.message._id,
    customerName: response.message.custName,
    brand: response.message.brand,
    phoneNumber: response.message.noHp,
    imgUrl: response.message.desainImgUrl,
    cdrUrl: response.message.desainCdrUrl,
    notes: response.message.catatan,
    type: response.message.jenis,
    invoiceNumber: response.message.noInvoice,
    password: response.message.password,
  };
};
