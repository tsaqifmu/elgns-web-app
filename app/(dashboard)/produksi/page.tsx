"use client";

import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

import { useFetchProductions } from "@/hooks/production/useFetchProductions";

import {
  DialogProductionAction,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";

import { DataTable } from "@/components/dashboard/data-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import { getColumn } from "@/components/dashboard/produksi/columns";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import DialogTableEdit from "@/components/dashboard/produksi/dialogTableComponent/dialog-table-edit";
import DialogTableDelete from "@/components/dashboard/produksi/dialogTableComponent/dialog-table-delete";

const ProductionPage: FC = () => {
  const { data, isError, isLoading, error } = useFetchProductions();
  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;
  const state = (state: DialogProductionAction) => [
    state.openEditProductionDialog,
    state.openDeleteProductionDialog,
  ];
  const [openEditProductionDialog, openDeleteProductionDialog] =
    useDialogProductionStore(useShallow(state));

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable
            columns={getColumn(
              openEditProductionDialog,
              openDeleteProductionDialog,
            )}
            data={dataSource as any}
          />
          <DataTablePagination dataInfo={dataInfo} />
          <DialogTableEdit />
          <DialogTableDelete />
        </>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA PRODUKSI</h1>
      </header>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default ProductionPage;
