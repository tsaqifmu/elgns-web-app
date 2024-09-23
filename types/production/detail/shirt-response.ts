import { Shirt } from "./shirt";

export interface ShirtResponse {
  _id: string;
  sablonBaju: string;
  Bahan: string;
  Pola: string;
  bahanKerah: string;
  polaKerah: string;
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

export const mapShirtResponseToShirt = (
  shirtsResponse: ShirtResponse[],
): Shirt[] => {
  return shirtsResponse.map((item) => {
    const {
      _id,
      sablonBaju,
      Bahan,
      Pola,
      bahanKerah,
      polaKerah,
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
      printingShirt: sablonBaju,
      material: Bahan,
      pattern: Pola,
      materialCollar: bahanKerah,
      patternCollar: polaKerah,
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
