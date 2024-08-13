import { FC } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, DataCustomer } from "./columns";

const dataSource: DataCustomer[] = [
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      dateOfEntry: "20 Feb 2024",
      name: "ING (SEKARIBA)",
      phoneNumber: 6287777060010,
      address: "BATANG",
      status: "DEAL" as const,
    })),
];

const CustomerPage: FC = () => {
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA CUSTOMER</h1>
        <Button className="space-x-1 bg-[#5BADC5] text-xs lg:space-x-3 lg:text-base">
          <CirclePlus className="w-4 lg:w-6" />
          <p>TAMBAH CUSTOMER</p>
        </Button>
      </header>
      <main className="mt-9">
        <DataTable columns={columns} data={dataSource} />
      </main>
    </>
  );
};

export default CustomerPage;
