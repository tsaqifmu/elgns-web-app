"use client";

import { useFetchBoardList } from "@/hooks/useMonitoring";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ColumnList from "@/components/dashboard/monitoring/column-list";
import DialogTableMonitoringDetail from "@/components/dashboard/monitoring/dialogTableComponent/dialog-table-monitoring-detail";

const MonitoringPage = () => {
  const { data, isError, isLoading, error } = useFetchBoardList();

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (data)
      return (
        <>
          <ColumnList columnList={data.boards} tasksResponse={data.cards} />
          <DialogTableMonitoringDetail />
        </>
      );
    return null;
  };

  return <div>{renderContent()}</div>;
};

export default MonitoringPage;
