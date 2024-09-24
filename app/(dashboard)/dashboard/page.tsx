"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import React, { useEffect } from "react";
import { AdminDashboard } from "./admin-dashboard";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import ContainerPage from "@/components/dashboard/container-page";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useAuth();
  const role = data?.role.toLowerCase() ?? undefined;
  const isAdmin = role === "admin";

  useEffect(() => {
    if (role && !isAdmin) {
      router.push("/monitoring");
    }
  }, [role, isAdmin, router]);

  if (isLoading)
    return (
      <ContainerPage>
        <SkeletonTable />
      </ContainerPage>
    );

  if (isError) <ErrorLoadData error={error} />;

  if (isAdmin) return <AdminDashboard />;
};

export default DashboardPage;
