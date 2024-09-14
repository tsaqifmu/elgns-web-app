"use client";
import { useShallow } from "zustand/react/shallow";

import { useFetchUserData } from "@/hooks/admin/useAdmin";

import {
  DialogAdminAction,
  useDialogAdminStore,
} from "@/stores/dialog-admin-store";

import ErrorLoadData from "@/components/dashboard/error-load-data";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import { getColumnsAdmin } from "@/components/dashboard/admin/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

const AdminPage = () => {
  const { data, isError, isLoading, error } = useFetchUserData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  // Zustand store
  const [openEditAdminDialog, openDeleteAdminDialog] = useDialogAdminStore(
    useShallow((state: DialogAdminAction) => [
      state.openEditAdminDialog,
      state.openDeleteAdminDialog,
    ]),
  );

  // Data column for table
  const columns = getColumnsAdmin(openEditAdminDialog, openDeleteAdminDialog);

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={columns} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
          {/* <DialogTableCreate />
          <DialogTableDetail />
          <DialogTableEdit />
          <DialogTableDelete /> */}
        </>
      );
    return null;
  };
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA PEGAWAI</h1>
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
          // onClick={openCreateCustomerDialog}
        >
          <p>TAMBAH PEGAWAI</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>
      </header>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default AdminPage;
