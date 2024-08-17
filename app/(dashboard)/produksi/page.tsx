import React, { FC } from "react";
import { DataTable } from "./data-table";
import { columns, DataProduksi } from "./columns";

const dataSource: DataProduksi[] = [
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      invoice: "WO.01.20 FEB-SEKARIMBA-MAKLON",
      dateOfEntry: "20 FEB 2024",
      dateOfExit: "27 FEB 2024",
      name: "ING (SEKARIBA)",
      address: "BATANG",
    })),
];

const ProductionPage: FC = () => {
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA PRODUKSI</h1>
      </header>
      <main className="mt-9">
        <DataTable columns={columns} data={dataSource} />
      </main>
    </>
  );
};

export default ProductionPage;
