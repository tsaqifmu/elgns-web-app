"use client";

// SUDAH PIKSS
import { FC, useState } from "react";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import { getColumns } from "@/components/dashboard/customer/columns";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { DataTable } from "@/components/dashboard/customer/data-table";
import { DataTablePagination } from "@/components/dashboard/customer/data-table-pagination";
import { useCustomerDialog } from "@/contexts/CustomerDialogContext";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";
import DialogTableDetail from "@/components/dashboard/customer/dialogTableComponent/dialog-table-detail";
import DialogTableEdit from "@/components/dashboard/customer/dialogTableComponent/dialog-table-edit";
import DialogTableDelete from "@/components/dashboard/customer/dialogTableComponent/dialog-table-delete";

const CustomerPage: FC = () => {
  const { data, isError, isLoading, error } = useFetchCustomerData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;
  const { openDialog, dialogType, customer } = useCustomerDialog();
  const columns = getColumns(openDialog);

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={columns} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
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
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA CUSTOMER</h1>
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
          onClick={() => openDialog("create", customer)}
        >
          <p>TAMBAH CUSTOMER</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>{" "}
      </header>

      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default CustomerPage;
