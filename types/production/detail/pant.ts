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

export const emptyPantData = {
  id: crypto.randomUUID(),
  printingPant: "",
  material: "",
  pattern: "",
  color: "",
  sleeve: "",
  sizeS: 0,
  sizeM: 0,
  sizeL: 0,
  sizeXL: 0,
  sizeXXL: 0,
  size3XL: 0,
  size5XL: 0,
  size6XL: 0,
  size7XL: 0,
  custom: 0,
  total: 0,
};

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
