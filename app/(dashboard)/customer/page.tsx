"use client";

import { FC, useState } from "react";
import { CirclePlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "./data-table";
import { columns, DataCustomer } from "./columns";
import { DataTablePagination } from "./data-table-pagination";

import { getCustomers } from "@/lib/customerService";
import { Button } from "@/components/ui/button";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";

const CustomerPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const dataSource = data as DataCustomer[];
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;
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

      <main className="mt-9">
        <DataTable columns={columns} data={dataSource} />
        <DataTablePagination />
      </main>
    </>
  );
};

export default CustomerPage;
