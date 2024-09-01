import { PantResponse } from "./pant-response";

export interface Pant {
  id: string;
  printingPant: string;
  material: string;
  pattern: string;
  color: string;
  sleeve: string;
  sizeS: number;
  sizeM: number;
  sizeL: number;
  sizeXL: number;
  sizeXXL: number;
  size3XL: number;
  size5XL: number;
  size6XL: number;
  size7XL: number;
  custom: number;
  total: number;
}

export const mapPantToPantResponse = (pants: Pant[]) => {
  return pants.map((pant) => {
    const {
      printingPant,
      material,
      pattern,
      color,
      sleeve,
      sizeS,
      sizeM,
      sizeL,
      sizeXL,
      sizeXXL,
      size3XL,
      size5XL,
      size6XL,
      size7XL,
      custom,
      total,
    } = pant;

    return {
      sablonCelana: printingPant,
      Bahan: material,
      Pola: pattern,
      Warna: color,
      Lengan: sleeve,
      S: sizeS,
      M: sizeM,
      L: sizeL,
      XL: sizeXL,
      XXL: sizeXXL,
      XXXL: size3XL,
      XXXXXL: size5XL,
      XXXXXXL: size6XL,
      XXXXXXXL: size7XL,
      custom,
      total,
    };
  });
};
