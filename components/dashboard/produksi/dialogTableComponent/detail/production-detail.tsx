import { FileUp, Loader2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import React, { useEffect, useRef, useState } from "react";

import { DetailPant } from "./detail-pant";
import { DetailShirt } from "./detail-shirt";
import { DetailBackName } from "./detail-back-name";

import { useFetchProductionDetail } from "@/hooks/production/useFetchProductionDetail";
import { useUpdateProductionDetail } from "@/hooks/production/useUpdateProductionDetail";
import { useFetchMaterialsAndColors } from "@/hooks/production/useFetchMaterialsAndColors";

import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";

import { proccesExcelFileUpload } from "@/lib/handleUploadFileExcel";

import { Button } from "@/components/ui/button";
import { Pant } from "@/types/production/detail/pant";
import { DialogFooter } from "@/components/ui/dialog";
import { Shirt } from "@/types/production/detail/shirt";
import { IDetail } from "@/types/production/detail/detail";
import { BackName } from "@/types/production/detail/back-name";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";

export const ProductionDetail = () => {
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [pants, setPants] = useState<Pant[]>([]);
  const [backNames, setBackNames] = useState<BackName[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [dataUploadExcel, setDataUploadExcel] = useState<any>([]);
  const [dataFileExcelName, setFileExcelName] = useState<any>("");

  // zustand store
  const [editProductionData, _] = useDialogProductionStore(
    useShallow((state: DialogProductionState & DialogProductionAction) => [
      state.editProductionData,
      state.closeEditProductionDialog,
    ]),
  );

  // useFetchProductionDetail
  const {
    data: productionDetailApiResponse,
    isLoading,
    isError,
    error,
  } = useFetchProductionDetail(editProductionData?.id);

  const { data: materialsAndColors, isLoading: isFetchingMaterialsAndColors } =
    useFetchMaterialsAndColors();

  const { mutate: updateProductionDetail, isPending } =
    useUpdateProductionDetail(editProductionData?.id, () => {});

  useEffect(() => {
    if (!productionDetailApiResponse) return;

    setShirts(productionDetailApiResponse.data.shirts);
    setPants(productionDetailApiResponse.data.pants);
    setBackNames(productionDetailApiResponse.data.backNames);
  }, [productionDetailApiResponse]);

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

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const { fileName, dataObjects } = await proccesExcelFileUpload(file);
      setDataUploadExcel(dataObjects);
      setFileExcelName(fileName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    if (isLoading || isFetchingMaterialsAndColors)
      return (
        <div className="p-4">
          <SkeletonTable />
        </div>
      );
    if (isError) return <ErrorLoadData error={error} />;
    if (productionDetailApiResponse) {
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
              materialsAndColors={materialsAndColors}
            />

            <DetailPant
              pants={pants}
              setPants={setPants}
              setTotalItems={setTotalItemsValue}
              materialsAndColors={materialsAndColors}
            />
            <DetailBackName
              backNames={backNames}
              setBackNames={setBackNames}
              dataUploadExcel={dataUploadExcel}
            />
          </div>

          <DialogFooter className="flex gap-1">
            <div>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileChange}
                ref={hiddenFileInput}
              />
              <Button
                // disabled={true}
                onClick={handleFileClick}
                size={"modalTable"}
                variant={"outline"}
                className="flex items-center gap-2 border-gray-900 px-2 py-1 text-base font-medium hover:bg-gray-300"
              >
                <FileUp />{" "}
                <span>
                  {dataFileExcelName ? dataFileExcelName : "UPLOAD PDF"}
                </span>
              </Button>
            </div>

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
