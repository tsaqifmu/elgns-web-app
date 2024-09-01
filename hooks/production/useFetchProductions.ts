import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductions } from "@/lib/productionService";
import { mapProductionItemResponse } from "@/types/production/production-item-response";
import { useSearchParams } from "next/navigation";

export const useFetchProductions = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString() || "1";
  const limit = searchParams.get("pageSize")?.toString() || "5";

  return useQuery({
    queryKey: ["productions", page, limit],
    queryFn: async () => {
      const response = await getProductions(page, limit);
      return response;
    },
    select: (response) => {
      const products = mapProductionItemResponse(response.data.message.docs);
      return {
        docs: products,
        dataInfo: {
          totalDocs: response.data.message.totalDocs,
          limit: response.data.message.limit,
          totalPages: response.data.message.totalPages,
          page: response.data.message.page,
          hasPrevPage: response.data.message.hasPrevPage,
          hasNextPage: response.data.message.hasNextPage,
        },
      };
    },
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
