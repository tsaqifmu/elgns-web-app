import { useQuery } from "@tanstack/react-query";

import { getMonitoringDetailMenu } from "@/lib/monitoringService";
import { IDetail } from "@/types/production/detail/detail";

import {
  DetailResponse,
  mapProductionDetailResponse,
} from "@/types/production/detail/detail-response";

export const useFetchMonitoringDetail = (productionId: string | undefined) => {
  return useQuery({
    queryKey: ["monitoringDetail", productionId],
    queryFn: async (): Promise<DetailResponse> => {
      const response = await getMonitoringDetailMenu(productionId);
      return response;
    },
    select: (response): IDetail => mapProductionDetailResponse(response),
  });
};
