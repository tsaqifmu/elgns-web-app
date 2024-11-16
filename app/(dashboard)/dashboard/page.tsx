"use client";
import React, { useEffect } from "react";

import { useFetchDashboardData } from "@/hooks/dashboard/useDashboard";

import FilterInput from "@/components/dashboard/filter-input";
import { DataTable } from "@/components/dashboard/data-table";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { getColumnsDashboard } from "@/components/dashboard/dashboard/columns";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";

const DashboardPage = () => {
  const { data, isError, isLoading, error } = useFetchDashboardData();

  const FILTER_SELECT_OPTION = [
    {
      id: 1,
      label: "PRODUKSI",
      value: "produksi",
    },
    {
      id: 2,
      label: "SELESAI",
      value: "selesai",
    },
  ];

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <div className="space-y-3">
          <FilterInput option={FILTER_SELECT_OPTION} />
          <DataTable columns={getColumnsDashboard()} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
        </div>
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
