import { ApiResponse } from "@/hooks/useFetchProductions";

export interface ProductionDTO {
  _id: string;
  invoice: string;
  dateOfEntry: string;
  dateOfExit: string;
  name: string;
  regency: string;
  address: string;
}

export let productions: ProductionDTO[] = [
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      _id: index.toString(),
      invoice: "INV " + index.toString(),
      dateOfEntry: "2024-08-22T14:30:00Z",
      dateOfExit: "2024-08-29T14:30:00Z",
      name: "INGRAYARD",
      regency: "SUBANG",
      address: "aaaa",
    })),
];

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const getProductions = async () => {
  const res = {
    data: {
      message: {
        docs: [...productions],
      },
    },
  } as ApiResponse<ProductionDTO[]>;

  return wait(0).then(() => res);
};

export const getProduct = async (id: string) => {
  const product = productions.find((product) => product._id === id);

  return wait(1000).then(() => product);
};

// export const addProduct = async (product: DataProduct) => {
//   const newProduct: DataProduct = { ...product, id: Date.now().toString() };
//   productions.push(newProduct);

//   return wait(1000).then(() => newProduct);
// };

// export const updateProduct = async (updatedProduct: DataProduct) => {
//   productions = productions.map((product) =>
//     product.id === updatedProduct.id
//       ? { ...product, ...updatedProduct }
//       : product,
//   );

//   const product: DataProduct = productions.find(
//     (product) => product.id === updatedProduct.id,
//   )!;

//   return wait(1000).then(() => product);
// };

// export const deleteProduct = (id: string) => {
//   productions = productions.filter((product) => product.id !== id);
//   return wait(1000).then(() => id);
// };
