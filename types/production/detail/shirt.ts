import { ShirtResponse } from "./shirt-response";

export interface Shirt {
  id: string;
  printingShirt: string;
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

export const mapShirtToShirtResponse = (shirts: Shirt[]) => {
  return shirts.map((pant) => {
    const {
      printingShirt,
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
      sablonBaju: printingShirt,
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