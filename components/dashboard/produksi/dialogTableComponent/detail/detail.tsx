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
import { IDetail } from "@/types/production/detail/detail";

export const Detail = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
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
    const payload: IDetail = {
      data: {
        total: totalItems,
        shirts: shirts,
        pants: pants,
        backNames: backNames,
      },
    };
    updateProductionDetail(payload);
  };

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
    if (productionDetailData) {
      return (
        <div>
          <div className="flex flex-col gap-4 px-5 pb-5">
            <div className="flex justify-between font-medium">
              <h1>BAJU</h1>
              <h1>TOTAL: {totalItems}</h1>
            </div>{" "}
            <DetailShirt
              shirts={shirts}
              setShirts={setShirts}
              setTotalItems={setTotalItemsValue}
            />
            <DetailPant
              pants={pants}
              setPants={setPants}
              setTotalItems={setTotalItemsValue}
            />
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
