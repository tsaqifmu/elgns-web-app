export type BahanDataColumns = {
  id: string;
  name: string;
  weight: string;
  used: string;
  stock: string;
  color?: string;
};

export interface FabricDataColumns {
  _id: string;
  name: string;
  color: string;
  stock: number;
  used: number;
  remaining: number;
  __v: number;
  id: string;
}

// export interface ApiResponse {
//   docs: DocItem[];
// }
