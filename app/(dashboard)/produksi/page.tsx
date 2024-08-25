"use client";

import React, { FC } from "react";
// import { DataTable } from "./data-table";
// import { columns } from "./columns";
// import { Production, useFetchProductions } from "@/hooks/useFetchProductions";
// import SkeletonTable from "@/components/dashboard/skeleton-table";
// import ErrorLoadData from "@/components/dashboard/error-load-data";
// import { DataTablePagination } from "../customer/data-table-pagination";

const ProductionPage: FC = () => {
  // const { data: dataSource, isLoading, isError, error } = useFetchProductions();

  // const renderContent = () => {
  //   if (isLoading) return <SkeletonTable />;
  //   if (isError) return <ErrorLoadData error={error} />;
  //   if (dataSource)
  //     return (
  //       <>
  //         <DataTable columns={columns} data={dataSource as any} />
  //         <DataTablePagination />
  //       </>
  //     );
  //   return null;
  // };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA PRODUKSI</h1>
      </header>
      {/* <main className="mt-9">{renderContent()}</main> */}
    </>
  );
};

export default ProductionPage;
