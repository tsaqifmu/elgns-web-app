import { useQuery } from "@tanstack/react-query";

import { ProductionOverview } from "@/types/production/overview/production-overview";
import { getProductionOverview } from "@/lib/productionService";

import {
  mapOverviewResponse,
  ProductionOverviewResponse,
} from "@/types/production/overview/production-overview-response";

export const useFetchProductionOverview = (
  productionId: string | undefined,
) => {
  return useQuery({
    queryKey: ["productionOverview", productionId],
    queryFn: async (): Promise<ProductionOverviewResponse> => {
      const response = await getProductionOverview(productionId);
      return response;
    },
    select: (response): ProductionOverview => mapOverviewResponse(response),
  });
};
