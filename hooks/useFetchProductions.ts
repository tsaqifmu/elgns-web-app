import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { getProductions, ProductionDTO } from "@/lib/productService";
import { formatToIndonesianDate } from "@/lib/dateUtils";

export interface ApiResponse<ItemType> {
  data: {
    message: {
      docs: ItemType;
    };
  };
}

export interface Production {
  id: string;
  invoice: string;
  dateOfEntry: string;
  dateOfExit: string;
  name: string;
  regency: string;
  address: string;
  phoneNumber: string;
  notes: string;
  type: string;
}

export const useFetchProductions = () => {
  return useQuery<Production[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProductions();
      const products = mapToProduction(response.data.message.docs);
      return products;
    },
  });
};

const mapToProduction = (data: ProductionDTO[]): Production[] => {
  return data.map((data) => {
    const { _id, invoice, dateOfEntry, dateOfExit, name, address, regency } =
      data;

    return {
      id: _id,
      invoice,
      dateOfEntry,
      dateOfExit,
      name,
      regency,
      address: "alamatku di mana yah?",
      phoneNumber: "6285177843218",
      notes: "haloo bangg",
      type: "BASEBALL FULLPRINT, KAOS, LANYARD",
    };
  });
};

// export const useFetchProducts = () => {
//   return useQuery<ApiResponse<Product>>({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await apiRequest({
//         path: "/customer/list",
//         method: HttpMethod.GET,
//         params: {
//           alphabet: "ascending",
//           year: "2024",
//           month: "",
//           week: "",
//           name: "",
//           status: "",
//           page: "",
//         },
//       });

//       console.log(response);
//       return response;
//     },
// select: (response) => {
//   console.log(response);
//   // mapToProduct(response.data.message.docs);
//   return {
//     data: {
//       message: {
//         docs: [produkku],
//       },
//     },
//   } as ApiResponse<Product[]>;
// },
//   });
// };
