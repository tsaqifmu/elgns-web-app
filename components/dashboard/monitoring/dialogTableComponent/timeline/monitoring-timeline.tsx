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

export default function MonitoringTimeline() {
  const [cardMonitoringId, closeEditMonitoringDialog] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.cardMonitoringId,
        state.closeEditMonitoringDialog,
      ]),
    );

  // const {
  //   data: production,
  //   isLoading,
  //   isError,
  //   error,
  // } = useFetchMonitoringTimeline(cardMonitoringId);

  return <div className="p-4">Sedang dalam pengerjaan.</div>;

  // if (isLoading) {
  //   return (
  //     <div className="p-4">
  //       <SkeletonTable />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <ErrorLoadData error={error} />;
  // }

  // if (production) {
  //   console.log("inihilation", production);
  //   return <div className="flex gap-8 p-5">{/* {production.map()} */}</div>;
  // }
}
