"use client";

import { FC, useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useDebounce } from "use-debounce";

import { useFetchCustomerData } from "@/hooks/customer/useCustomers";
import {
  DialogAction,
  DialogState,
  useDialogStore,
} from "@/stores/dialog-store";

import { Button } from "@/components/ui/button";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { getColumns } from "@/components/dashboard/customer/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import DialogTableEdit from "@/components/dashboard/customer/dialogTableComponent/dialog-table-edit";
import DialogTableCreate from "@/components/dashboard/customer/dialogTableComponent/dialog-table-create";
import DialogTableDetail from "@/components/dashboard/customer/dialogTableComponent/dialog-table-detail";
import DialogTableDelete from "@/components/dashboard/customer/dialogTableComponent/dialog-table-delete";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CustomerPage: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterValue, setFilterValue] = useState<string>(
    searchParams.get("filter") || "",
  );

  // Add debounced value with 500ms delay
  const [debouncedFilter] = useDebounce(filterValue, 500);

  const { data, isError, isLoading, error } = useFetchCustomerData();

  const dataSource = data?.docs;
  const dataInfo = data?.dataInfo;

  const [
    openCreateCustomerDialog,
    openDetailCustomerDialog,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
  ] = useDialogStore(
    useShallow((state: DialogState & DialogAction) => [
      state.openCreateCustomerDialog,
      state.openDetailCustomerDialog,
      state.openEditCustomerDialog,
      state.openDeleteCustomerDialog,
    ]),
  );

  const columns = getColumns(
    openDetailCustomerDialog,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
  );

  // Use effect to update URL when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!debouncedFilter.trim()) {
      params.delete("filter");
    } else {
      params.set("filter", debouncedFilter);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedFilter, pathname, router, searchParams]);

  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <div>
          <DataTable columns={columns} data={dataSource as any} />
          <DataTablePagination dataInfo={dataInfo} />
          <DialogTableCreate />
          <DialogTableDetail />
          <DialogTableEdit />
          <DialogTableDelete />
        </div>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">DATA CUSTOMER</h1>
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
          onClick={openCreateCustomerDialog}
        >
          <p>TAMBAH CUSTOMER</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>
      </header>
      <Input
        value={filterValue}
        placeholder="Cari berdasar no invoice, custname, dan alamat"
        type="text"
        className="mt-3 w-60 bg-white"
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
      />
      <main className="mt-3">{renderContent()}</main>
    </>
  );
};

export default CustomerPage;
