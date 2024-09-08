import {
  BackNameResponse,
  mapBackNameResponseToBackName,
} from "./back-name-response";
import { IDetail } from "./detail";
import { mapPantResponseToPant, PantResponse } from "./pant-response";
import { mapShirtResponseToShirt, ShirtResponse } from "./shirt-response";

export interface DetailResponse {
  error: boolean;
  message: {
    _id: string;
    jumlah: number;
    tabelKeteranganBaju: ShirtResponse[];
    tabelKeteranganCelana: PantResponse[];
    tabelNmrPunggung: BackNameResponse[];
  };
}

export const mapProductionDetailResponse = (
  response: DetailResponse,
): IDetail => {
  return {
    data: {
      total: response.message.jumlah,
      shirts: mapShirtResponseToShirt(response.message.tabelKeteranganBaju),
      pants: mapPantResponseToPant(response.message.tabelKeteranganCelana),
      backNames: mapBackNameResponseToBackName(
        response.message.tabelNmrPunggung,
      ),
    },
  };
};
