import { useQuery } from "@tanstack/react-query";

import { getProductionDetailMenu } from "@/lib/productionService";
import { Detail } from "@/types/production/detail/detail";

import {
  DetailResponse,
  mapProductionDetailResponse,
} from "@/types/production/detail/detail-response";

export const useFetchProductionDetail = (productionId: string | undefined) => {
  return useQuery({
    queryKey: ["productionDetail", productionId],
    queryFn: async (): Promise<DetailResponse> => {
      const response = await getProductionDetailMenu(productionId);
      return response;
    },
    select: (response): Detail => mapProductionDetailResponse(response),
  });
};
