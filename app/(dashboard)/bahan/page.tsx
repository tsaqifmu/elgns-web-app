"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  DialogFabricAction,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { getColumnsBahan } from "@/components/dashboard/bahan/columns";
import DialogTableCreateBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-create";
import DialogTableDeleteBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-delete";
import DialogTableEditBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-edit";
import { useFetchFabricData } from "@/hooks/bahan/useBahan";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import ToggleFabricColor from "@/components/dashboard/bahan/toggle-fabric-color";

export type BahanDataColumns = {
  id: string;
  name: string;
  weight: string;
  used: string;
  stock: string;
};

const FabricPage = () => {
  const [cloth, setCloth] = useState<string>("white");

  const { data, isError, isLoading, error } = useFetchFabricData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  console.log(data);

  // Zustand store
  const [openCreateFabricDialog, openEditFabricDialog, openDeleteFabricDialog] =
    useDialogBahanStore(
      useShallow((state: DialogFabricAction) => [
        state.openCreateFabricDialog,
        state.openEditFabricDialog,
        state.openDeleteFabricDialog,
      ]),
    );

  const columns = getColumnsBahan(openEditFabricDialog, openDeleteFabricDialog);

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={columns} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
          <DialogTableCreateBahan />
          <DialogTableEditBahan />
          <DialogTableDeleteBahan />
        </>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <ToggleFabricColor />
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
          onClick={openCreateFabricDialog}
        >
          <p>TAMBAH KAIN</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>
      </header>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default FabricPage;
