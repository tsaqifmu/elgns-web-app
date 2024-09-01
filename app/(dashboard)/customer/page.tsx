"use client";

import { FC } from "react";
import { CirclePlus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import {
  DialogAction,
  DialogState,
  useDialogStore,
} from "@/stores/dialog-store";

import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { getColumns } from "@/components/dashboard/customer/columns";
import { DataTable } from "@/components/dashboard/customer/data-table";
import { DataTablePagination } from "@/components/dashboard/customer/data-table-pagination";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";
import DialogTableDetail from "@/components/dashboard/customer/dialogTableComponent/dialog-table-detail";
import DialogTableEdit from "@/components/dashboard/customer/dialogTableComponent/dialog-table-edit";
import DialogTableDelete from "@/components/dashboard/customer/dialogTableComponent/dialog-table-delete";

const CustomerPage: FC = () => {
  const { data, isError, isLoading, error } = useFetchCustomerData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  const [
    openCreateCustomerDialog,
    openDetailCustomerDialog,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
  ] = useDialogStore(
    useShallow((state: DialogState & DialogAction) => [
      state.openCreateCustomerDialog,
      state.openDetailCustomerDialog,
      state.openEditCustomerDialog,
      state.openDeleteCustomerDialog,
    ]),
  );
  const columns = getColumns(
    openDetailCustomerDialog,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
  );

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <Suspense fallback={<SkeletonTable />}>
            <DataTable columns={columns} data={dataSource as any} />
            <DataTablePagination dataInfo={dataInfo} />
          </Suspense>
          <DialogTableCreate />
          <DialogTableDetail />
          <DialogTableEdit />
          <DialogTableDelete />
        </>
      );
    return null;
  };

  return (
    <>
      <Suspense fallback={<SkeletonTable />}>
        <header className="flex items-center justify-between">
          <h1 className="w-10 text-3xl font-semibold lg:w-full">
            DATA CUSTOMER
          </h1>
          <Button
            variant={"teal"}
            className="space-x-1 text-xs lg:space-x-3 lg:text-base"
            onClick={openCreateCustomerDialog}
          >
            <p>TAMBAH CUSTOMER</p>
            <CirclePlus className="w-4 lg:w-6" />
          </Button>
        </header>

        <main className="mt-9">{renderContent()}</main>
      </Suspense>
    </>
  );
};

export default CustomerPage;
