import { MonitoringOverview } from "./monitoring-overview";

export interface MonitoringOverviewResponse {
  error: false;
  message: {
    _id: string;
    custName: string;
    password: string;
    noHp: string;
    desainImgUrl: string;
    desainCdrUrl: string;
    desainPdfUrl: string;
    catatan: string;
    jenis: string;
    noInvoice: string;
    tglKeluar: string;
    tglMasuk: string;
  };
}

export const mapMonitoringOverviewResponse = (
  response: MonitoringOverviewResponse,
): MonitoringOverview => {
  return {
    id: response.message._id,
    customerName: response.message.custName,
    password: response.message.password,
    phoneNumber: response.message.noHp,
    imgUrl: response.message.desainImgUrl,
    cdrUrl: response.message.desainCdrUrl,
    pdfUrl: response.message.desainPdfUrl,
    notes: response.message.catatan,
    type: response.message.jenis,
    invoiceNumber: response.message.noInvoice,
    dateIn: response.message.tglMasuk,
    dateOut: response.message.tglKeluar,
  };
};
