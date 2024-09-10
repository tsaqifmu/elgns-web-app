import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import { useFetchMonitoringTimeline } from "@/hooks/monitoring/useFetchMonitoringTimeline";
import {
  DialogMonitoringAction,
  DialogMonitoringState,
  useDialogMonitoringStore,
} from "@/stores/dialog-monitoring-store";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import MonitoringTimelineItem from "./monitoring-timeline-item";
import { DialogFooter } from "@/components/ui/dialog";

export default function MonitoringTimeline() {
  const [cardMonitoringId, closeEditMonitoringDialog] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.cardMonitoringId,
        state.closeEditMonitoringDialog,
      ]),
    );

  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useFetchMonitoringTimeline(cardMonitoringId);

  if (isLoading) {
    return (
      <div className="p-4">
        <SkeletonTable />
      </div>
    );
  }

  if (isError) {
    return <ErrorLoadData error={error} />;
  }

  if (items && items.length < 1) {
    return (
      <div className="mb-2 flex items-center justify-center p-4">
        DATA KOSONG
      </div>
    );
  }

  if (items) {
    return (
      <>
        <div className="flex flex-col px-5 pb-24">
          {items.map((item, index) => {
            return (
              <div key={item._id} className="w-full">
                <MonitoringTimelineItem item={item} />
                {index + 1 !== items.length && (
                  <div className="w-full border-t border-black" />
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter></DialogFooter>
      </>
    );
  }
}
