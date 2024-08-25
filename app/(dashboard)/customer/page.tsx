"use client";

import { FC } from "react";

import { DataTable } from "./data-table";
import { Columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
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
