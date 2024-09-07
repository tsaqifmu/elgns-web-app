import { useQuery } from "@tanstack/react-query";

import { Overview } from "@/types/production/overview/overview";
import { getProductionOverview } from "@/lib/productionService";

import {
  mapOverviewResponse,
  OverviewResponse,
} from "@/types/production/overview/overview-response";

export const useFetchProductionOverview = (
  productionId: string | undefined,
) => {
  return useQuery({
    queryKey: ["productionOverview", productionId],
    queryFn: async (): Promise<OverviewResponse> => {
      const response = await getProductionOverview(productionId);
      return response;
    },
    select: (response): Overview => mapOverviewResponse(response),
  });
};
