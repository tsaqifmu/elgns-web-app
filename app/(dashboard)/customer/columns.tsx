"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX } from "lucide-react";
import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import { Button } from "@/components/ui/button";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";
import { cn } from "@/lib/utils";

export type DataCustomer = {
  id: string;
  dateOfEntry: string;
  name: string;
  phoneNumber: number;
  address: string;
  status: "NEGO" | "DEAL";
  statusDescription: string;
};

// Konstanta untuk teks header
const HEADER_TITLES = {
  dateOfEntry: "TANGGAL MASUK",
  name: "NAMA CUSTOMER",
  phoneNumber: "NOMOR HP",
  address: "ALAMAT",
  status: "STATUS",
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const columns: ColumnDef<DataCustomer>[] = [
  {
    accessorKey: "dateOfEntry",
    header: () => <ColumnHeader title={HEADER_TITLES.dateOfEntry} />,
  },
  {
    accessorKey: "name",
    header: () => <ColumnHeader title={HEADER_TITLES.name} />,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <ColumnHeader title={HEADER_TITLES.phoneNumber} />,
  },
  {
    accessorKey: "address",
    header: () => <ColumnHeader title={HEADER_TITLES.address} />,
  },
  {
    accessorKey: "status",
    header: () => <ColumnHeader title={HEADER_TITLES.status} />,
    cell: ({ row }) => {
      const statusValue: string = row.getValue("status");

      return (
        <div
          className={cn(
            "flex w-fit items-center space-x-1 rounded-full px-[0.625rem] py-1 text-[0.625rem] text-white lg:w-20 lg:py-[0.3125rem] lg:text-sm",
            statusValue === "NEGO" ? "bg-destructive" : "bg-[#5BADC5]",
          )}
        >
          {statusValue === "NEGO" ? (
            <CircleX className="w-4 lg:w-6" />
          ) : (
            <CircleCheck className="w-4 lg:w-6" />
          )}
          <p>{statusValue}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <>
          <CustomeDialogTable
            variant="edit"
            title="EDIT DATA CUSTOMER"
            customer={customer}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
              </Button>
            }
          />
          <CustomeDialogTable
            variant="hapus"
            title="HAPUS DATA CUSTOMER"
            customer={customer}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconDelete className="text-gray-300 transition-all group-hover:text-red-500" />
              </Button>
            }
          />
        </>
      );
    },
  },
];
