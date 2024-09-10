import { MonitoringTimelineItemResponse } from "./monitoring-timeline-item-response";

export interface MonitoringTimelineResponse {
  error: boolean;
  message: {
    buktiPengerjaan: MonitoringTimelineItemResponse[];
  };
}
