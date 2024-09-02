import { ProductionItem } from "./production-item";

export interface ProductionItemResponse {
  _id: string;
  noInvoice: string;
  custName: string;
  alamatKabupaten: string;
  catatan: string;
  jenis: string;
}

export const mapProductionItemResponse = (
  data: ProductionItemResponse[],
): ProductionItem[] => {
  return data.map((data) => {
    const {
      _id,
      noInvoice,
      custName: name,
      alamatKabupaten,
      jenis,
      catatan,
    } = data;
    const invoice = noInvoice === undefined ? "-" : noInvoice;

    return {
      id: _id,
      invoice,
      name,
      regency: alamatKabupaten,
      notes: catatan,
      type: jenis,
    };
  });
};
