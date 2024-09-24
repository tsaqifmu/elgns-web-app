"use client";

import { useFetchBoardList } from "@/hooks/monitoring/useMonitoring";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ColumnList from "@/components/dashboard/monitoring/column-list";
import DialogTableMonitoringDetail from "@/components/dashboard/monitoring/dialogTableComponent/dialog-table-monitoring-detail";
import NavBar from "@/components/dashboard/navbar";
import ContainerPage from "@/components/dashboard/container-page";
import { useAuth } from "@/hooks/auth/useAuth";

const MonitoringPage = () => {
  const {
    data: user,
    isLoading: isAuthLoading,
    isError: isAuthError,
    error: authError,
  } = useAuth();
  const { data, isError, isLoading, error } = useFetchBoardList();

  const renderContent = () => {
    if (isLoading || isAuthLoading)
      return (
        <ContainerPage>
          <SkeletonTable />
        </ContainerPage>
      );
    if (isError || isAuthError) return <ErrorLoadData error={error} />;
    if (data && user)
      return (
        <>
          <NavBar
            isAdmin={user.role.toLowerCase() === "admin"}
            role={user.role}
          />
          <ContainerPage className="font-oswald">
            <ColumnList columnList={data.boards} tasksResponse={data.cards} />
            <DialogTableMonitoringDetail />
          </ContainerPage>
          ;
        </>
      );
    return null;
  };

  return <div>{renderContent()}</div>;
};

export default MonitoringPage;
