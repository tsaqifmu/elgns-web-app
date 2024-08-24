"use client";

import { FC, useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";

const CustomerPage: FC = () => {
  const {
    data: dataSource,
    isError,
    isLoading,
    error,
  } = useFetchCustomerData();
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={columns} data={dataSource as any} />
          <DataTablePagination />
        </>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA CUSTOMER</h1>
        <DialogTableCreate
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triger={
            <Button
              variant={"teal"}
              className="space-x-1 text-xs lg:space-x-3 lg:text-base"
            >
              <p>TAMBAH CUSTOMER</p>
              <CirclePlus className="w-4 lg:w-6" />
            </Button>
          }
        />
      </header>

      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default CustomerPage;
