import { Pant } from "./pant";

export interface PantResponse {
  _id: string;
  sablonCelana: string;
  Bahan: string;
  Pola: string;
  Warna: string;
  Lengan: string;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
  XXXL: number;
  XXXXXL: number;
  XXXXXXL: number;
  XXXXXXXL: number;
  custom: number;
  total: number;
}

export const mapPantResponseToPant = (
  pantsResponse: PantResponse[],
): Pant[] => {
  return pantsResponse.map((item) => {
    const {
      _id,
      sablonCelana,
      Bahan,
      Pola,
      Warna,
      Lengan,
      S,
      M,
      L,
      XL,
      XXL,
      XXXL,
      XXXXXL,
      XXXXXXL,
      XXXXXXXL,
      custom,
      total,
    } = item;

    return {
      id: _id,
      printingPant: sablonCelana,
      material: Bahan,
      pattern: Pola,
      color: Warna,
      sleeve: Lengan,
      sizeS: S,
      sizeM: M,
      sizeL: L,
      sizeXL: XL,
      sizeXXL: XXL,
      size3XL: XXXL,
      size5XL: XXXXXL,
      size6XL: XXXXXXL,
      size7XL: XXXXXXXL,
      custom,
      total,
    };
  });
};
