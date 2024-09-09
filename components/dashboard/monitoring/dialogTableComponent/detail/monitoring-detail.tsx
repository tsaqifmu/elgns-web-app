import React, { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { useFetchProductionDetail } from "@/hooks/production/useFetchProductionDetail";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { useShallow } from "zustand/react/shallow";
import { Loader2 } from "lucide-react";
import { Shirt } from "@/types/production/detail/shirt";
import { Pant } from "@/types/production/detail/pant";
import { BackName } from "@/types/production/detail/back-name";
import { IDetail } from "@/types/production/detail/detail";
import { DetailPant } from "@/components/dashboard/produksi/dialogTableComponent/detail/detail-pant";
import { DetailBackName } from "@/components/dashboard/produksi/dialogTableComponent/detail/detail-back-name";
import { DetailShirt } from "@/components/dashboard/produksi/dialogTableComponent/detail/detail-shirt";
import {
  DialogMonitoringAction,
  DialogMonitoringState,
  useDialogMonitoringStore,
} from "@/stores/dialog-monitoring-store";

export const MonitoringDetail = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [editMonitoringData, closeEditMonitoringDialog] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.editMonitoringData,
        state.closeEditMonitoringDialog,
      ]),
    );
  const productionId = editMonitoringData?._id;
  const {
    data: monitoringDetailData,
    isLoading,
    isError,
    error,
  } = useFetchProductionDetail(productionId);
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [pants, setPants] = useState<Pant[]>([]);
  const [backNames, setBackNames] = useState<BackName[]>([]);
  useEffect(() => {
    if (!monitoringDetailData) return;

    setShirts(monitoringDetailData.data.shirts);
    setPants(monitoringDetailData.data.pants);
    setBackNames(monitoringDetailData.data.backNames);
  }, [monitoringDetailData]);

  const setTotalItemsValue = () => {
    setTotalItems(
      shirts.reduce((acc, cur) => acc + cur.total, 0) +
        pants.reduce((acc, cur) => acc + cur.total, 0),
    );
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="p-4">
          <SkeletonTable />
        </div>
      );
    if (isError) return <ErrorLoadData error={error} />;
    if (monitoringDetailData) {
      return (
        <div>
          <div className="flex flex-col gap-4 px-5 pb-5">
            <div className="flex justify-between font-medium">
              <h1>BAJU</h1>
              <h1>TOTAL: {totalItems}</h1>
            </div>
            <DetailShirt
              shirts={shirts}
              setShirts={setShirts}
              setTotalItems={setTotalItemsValue}
              isReadOnly
            />
            <DetailPant
              pants={pants}
              setPants={setPants}
              setTotalItems={setTotalItemsValue}
              isReadOnly
            />
            <DetailBackName
              backNames={backNames}
              setBackNames={setBackNames}
              isReadOnly
            />
          </div>

          <DialogFooter></DialogFooter>
        </div>
      );
    }
  };

  return renderContent();
};
