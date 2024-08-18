"use client";

import { FC } from "react";
import { CirclePlus, MessageSquareWarning } from "lucide-react";

import { DataTable } from "./data-table";
import { columns, DataCustomer } from "./columns";
import { DataTablePagination } from "./data-table-pagination";

import { useFetchCustomerData } from "@/hooks/useCustomers";

import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";

const CustomerPage: FC = () => {
  const { data: dataSource, isError, isLoading } = useFetchCustomerData();

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData />;
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
        <CustomeDialogTable
          variant="tambah"
          title="TAMBAH DATA CUSTOMER"
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
