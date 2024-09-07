"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getProductions } from "@/lib/productionService";
import { mapProductionItemResponse } from "@/types/production/production-item-response";

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
