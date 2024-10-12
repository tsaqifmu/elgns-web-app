"use client";
import React, { useEffect } from "react";

import { useFetchDashboardData } from "@/hooks/dashboard/useDashboard";

import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { getColumnsDashboard } from "@/components/dashboard/dashboard/columns";

const DashboardPage = () => {
  const { data, isError, isLoading, error } = useFetchDashboardData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={getColumnsDashboard()} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
        </>
      );
    return null;
  };
  return (
    <>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default DashboardPage;
