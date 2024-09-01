import React, { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DetailBackName } from "./detail-back-name";
import { DetailShirt } from "./detail-shirt";
import { useFetchProductionDetail } from "@/hooks/production/useFetchProductionDetail";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { useUpdateProductionDetail } from "@/hooks/production/useUpdateProductionDetail";
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import { useShallow } from "zustand/react/shallow";
import { Loader2 } from "lucide-react";
import { Shirt } from "@/types/production/detail/shirt";
import { Pant } from "@/types/production/detail/pant";
import { BackName } from "@/types/production/detail/back-name";
import { DetailPant } from "./detail-pant";

export const Detail = () => {
  const [editProductionData, closeEditProductionDialog] =
    useDialogProductionStore(
      useShallow((state: DialogProductionState & DialogProductionAction) => [
        state.editProductionData,
        state.closeEditProductionDialog,
      ]),
    );
  const production = editProductionData;
  const {
    data: productionDetailData,
    isLoading,
    isError,
    error,
  } = useFetchProductionDetail(production?.id);
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [pants, setPants] = useState<Pant[]>([]);
  const [backNames, setBackNames] = useState<BackName[]>([]);
  const { mutate: updateProductionDetail, isPending } =
    useUpdateProductionDetail(production?.id, closeEditProductionDialog);

  useEffect(() => {
    if (!productionDetailData) return;

    setShirts(productionDetailData.data.shirts);
    setPants(productionDetailData.data.pants);
    setBackNames(productionDetailData.data.backNames);
  }, [productionDetailData]);

  const handleSubmit = () => {
    console.log("submitting", { shirts, pants, backNames });
    updateProductionDetail({
      data: {
        shirts: shirts,
        pants: pants,
        backNames: backNames,
      },
    });
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="p-4">
          <SkeletonTable />
        </div>
      );
    if (isError) return <ErrorLoadData error={error} />;
    if (productionDetailData) {
      return (
        <div>
          <div className="flex flex-col gap-4 px-5 pb-5">
            <DetailShirt shirts={shirts} setShirts={setShirts} />
            <DetailPant pants={pants} setPants={setPants} />
            <DetailBackName backNames={backNames} setBackNames={setBackNames} />
          </div>

          <DialogFooter>
            <Button
              size={"modalTable"}
              variant={"default"}
              type="submit"
              className="bg-yellow-500 uppercase"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Tunggu sebentar...</p>
                </>
              )}
              {!isPending && "Simpan"}
            </Button>
          </DialogFooter>
        </div>
      );
    }
  };

  return renderContent();
};