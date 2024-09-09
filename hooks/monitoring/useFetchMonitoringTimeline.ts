import { useQuery } from "@tanstack/react-query";

import { getMonitoringTimeline } from "@/lib/productionService";
import { MonitoringTimelineResponse } from "@/types/monitoring/timeline/monitoring-timeline-response";

export const useFetchMonitoringTimeline = (taskId: string | undefined) => {
  return useQuery({
    queryKey: ["monitoringTimeline", taskId],
    queryFn: async (): Promise<MonitoringTimelineResponse> => {
      const response = await getMonitoringTimeline(taskId);
      return response;
    },
    select: (response) => {
      return response.message.buktiPengerjaan;
    },
  });
};
