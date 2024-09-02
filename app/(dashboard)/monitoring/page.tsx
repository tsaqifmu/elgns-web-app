"use client";

import { useFetchBoardList } from "@/hooks/useMonitoring";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import BoardList from "@/components/dashboard/monitoring/boardList";

const MonitoringPage = () => {
  const { data: boardList, isError, isLoading, error } = useFetchBoardList();

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (boardList)
      return (
        <>
          <BoardList boardList={boardList} />
        </>
      );
    return null;
  };

  return <div>{renderContent()}</div>;
};

export default MonitoringPage;
