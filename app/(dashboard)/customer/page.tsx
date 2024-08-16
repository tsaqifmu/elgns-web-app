"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, DataCustomer } from "./columns";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";
import { useQuery } from "@tanstack/react-query";
import { customers, getCustomers } from "@/lib/customerService";

// export let dataSource: DataCustomer[] = [
//   ...Array(5)
//     .fill(null)
//     .map((_, index) => ({
//       id: index.toString(),
//       dateOfEntry: "20 Feb 2024",
//       name: "ING (SEKARIBA)",
//       phoneNumber: 6287777060010,
//       address: "BATANG",
//       status: "DEAL" as const,
//       statusDescription: "df",
//     })),
//   {
//     id: "6",
//     dateOfEntry: "20 Feb 2024",
//     name: "ING (SEKARIBA)",
//     phoneNumber: 6287777060010,
//     address: "BATANG",
//     status: "NEGO" as const,
//     statusDescription: "tesss",
//   },
// ];

const CustomerPage: FC = () => {
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
        <CustomeDialogTable
          variant="tambah"
          title="TAMBAH DATA CUSTOMER"
          triger={
            <Button className="space-x-1 bg-[#5BADC5] text-xs lg:space-x-3 lg:text-base">
              <p>TAMBAH CUSTOMER</p>
              <CirclePlus className="w-4 lg:w-6" />
            </Button>
          }
        />
      </header>
      <main className="mt-9">
        <DataTable columns={columns} data={dataSource} />
      </main>
    </>
  );
};

export default CustomerPage;
