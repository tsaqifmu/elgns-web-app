import { ProductionItem } from "./production-item";

export interface ProductionItemResponse {
  _id: string;
  noInvoice: string;
  custName: string;
  alamatKabupaten: string;
  desainImgUrl: string;
  desainCdrUrl: string;
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
      desainImgUrl,
      desainCdrUrl,
    } = data;
    const invoice = noInvoice === undefined ? "-" : noInvoice;

    return {
      id: _id,
      invoice,
      name,
      regency: alamatKabupaten,
      imgUrl: desainImgUrl,
      cdrUrl: desainCdrUrl,
    };
  });
};
