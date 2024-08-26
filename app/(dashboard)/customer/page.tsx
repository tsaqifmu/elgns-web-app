"use client";

// SUDAH PIKSS
import { FC } from "react";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import { Columns } from "@/components/dashboard/customer/columns";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { DataTable } from "@/components/dashboard/customer/data-table";
import { DataTablePagination } from "@/components/dashboard/customer/data-table-pagination";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";

const CustomerPage: FC = () => {
  const { data, isError, isLoading, error } = useFetchCustomerData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={Columns} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
        </>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA CUSTOMER</h1>
        <DialogTableCreate />
      </header>

      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default CustomerPage;
