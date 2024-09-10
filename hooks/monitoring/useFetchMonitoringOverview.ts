import { useQuery } from "@tanstack/react-query";
import {
  mapMonitoringOverviewResponse,
  MonitoringOverviewResponse,
} from "@/types/monitoring/overview/monitoring-overview-response";
import { MonitoringOverview } from "@/types/monitoring/overview/monitoring-overview";
import { getMonitoringOverview } from "@/lib/monitoringService";

export const useFetchMonitoringOverview = (
  productionId: string | undefined,
) => {
  return useQuery({
    queryKey: ["monitoringOverview", productionId],
    queryFn: async (): Promise<MonitoringOverviewResponse> => {
      const response = await getMonitoringOverview(productionId);
      return response;
    },
    select: (response): MonitoringOverview =>
      mapMonitoringOverviewResponse(response),
  });
};
