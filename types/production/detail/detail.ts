import { BackName, mapBackNameToBackNameResponse } from "./back-name";
import { DetailResponse } from "./detail-response";
import { mapPantToPantResponse, Pant } from "./pant";
import { PantResponse } from "./pant-response";
import { mapShirtToShirtResponse, Shirt } from "./shirt";
import { ShirtResponse } from "./shirt-response";

export interface Detail {
  data: {
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

export const mapDetailToDetailToSend = (detail: Detail) => {
  return {
    jumlah: detail.data.shirts.length + detail.data.pants.length,
    tabelKeteranganBaju: mapShirtToShirtResponse(detail.data.shirts),
    tabelKeteranganCelana: mapPantToPantResponse(detail.data.pants),
    tabelNmrPunggung: mapBackNameToBackNameResponse(detail.data.backNames),
  };
};
