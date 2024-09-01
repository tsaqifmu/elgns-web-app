import {
  BackNameResponse,
  mapBackNameResponseToBackName,
} from "./back-name-response";
import { mapPantResponseToPant, PantResponse } from "./pant-response";
import { mapShirtResponseToShirt, ShirtResponse } from "./shirt-response";

export interface DetailResponse {
  error: boolean;
  message: {
    _id: string;
    tabelKeteranganBaju: ShirtResponse[];
    tabelKeteranganCelana: PantResponse[];
    tabelNmrPunggung: BackNameResponse[];
  };
}

export const mapProductionDetailResponse = (response: DetailResponse) => {
  return {
    data: {
      shirts: mapShirtResponseToShirt(response.message.tabelKeteranganBaju),
      pants: mapPantResponseToPant(response.message.tabelKeteranganCelana),
      backNames: mapBackNameResponseToBackName(
        response.message.tabelNmrPunggung,
      ),
    },
  };
};
