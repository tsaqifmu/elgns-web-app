import { useQuery } from "@tanstack/react-query";

import { MonitoringTimelineResponse } from "@/types/monitoring/timeline/monitoring-timeline-response";
import { getMonitoringTimeline } from "@/lib/monitoringService";
import { MonitoringTimelineItemResponse } from "@/types/monitoring/timeline/monitoring-timeline-item-response";

export const useFetchMonitoringTimeline = (taskId: string | undefined) => {
  return useQuery({
    queryKey: ["monitoringTimeline", taskId],
    queryFn: async (): Promise<MonitoringTimelineResponse> => {
      const response = await getMonitoringTimeline(taskId);
      return response;
    },
    select: (response): MonitoringTimelineItemResponse[] => {
      return response.message.buktiPengerjaan;
    },
  });
};
