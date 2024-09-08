import { BackName, mapBackNameToBackNameResponse } from "./back-name";
import { mapPantToPantResponse, Pant } from "./pant";
import { PantResponse } from "./pant-response";
import { mapShirtToShirtResponse, Shirt } from "./shirt";
import { ShirtResponse } from "./shirt-response";

export interface IDetail {
  data: {
    total: number;
    shirts: Shirt[];
    pants: Pant[];
    backNames: BackName[];
  };
}

export interface DetailToSend {
  jumlah: number;
  tabelKeteranganBaju: ShirtResponse[];
  tabelKeteranganCelana: PantResponse[];
}

export const mapDetailToDetailToSend = (detail: IDetail) => {
  return {
    jumlah: detail.data.total,
    tabelKeteranganBaju: mapShirtToShirtResponse(detail.data.shirts),
    tabelKeteranganCelana: mapPantToPantResponse(detail.data.pants),
    tabelNmrPunggung: mapBackNameToBackNameResponse(detail.data.backNames),
  };
};
