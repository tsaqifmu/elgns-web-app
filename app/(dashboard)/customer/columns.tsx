"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Info } from "lucide-react";

import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import { Button } from "@/components/ui/button";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";

import { cn } from "@/lib/utils";
import { useState } from "react";
import DialogTableDetail from "@/components/dashboard/customer/dialogTableComponent/dialog-table-detail";
import DialogTableEdit from "@/components/dashboard/customer/dialogTableComponent/dialog-table-edit";
import DialogTableDelete from "@/components/dashboard/customer/dialogTableComponent/dialog-table-delete";

export type DataCustomer = {
  id: string;
  dateOfEntry: string;
  name: string;
  phoneNumber: string;
  regency: string;
  status: "NEGO" | "DEAL";
  statusDescription: string;
  address?: string;
};

// Konstanta untuk teks header
const HEADER_TITLES = {
  dateOfEntry: "TANGGAL MASUK",
  name: "NAMA CUSTOMER",
  phoneNumber: "NOMOR HP",
  regency: "ALAMAT",
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
    id: "initial",
    cell: ({ row }) => {
      const customerName: string = row.getValue("name");
      const status: string = row.getValue("status");

      const firstCharName = customerName?.split("")[0];
      return (
        <div
          className={cn(
            "h-6 w-6 rounded-full bg-teal text-center text-white",
            status === "NEGO" ? "bg-destructive" : "bg-teal",
          )}
        >
          <p>{firstCharName}</p>
        </div>
      );
    },
  },
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
    accessorKey: "regency",
    header: () => <ColumnHeader title={HEADER_TITLES.regency} />,
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
            statusValue === "NEGO" ? "bg-destructive" : "bg-teal",
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
      const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
      const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
      const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

      return (
        <>
          <DialogTableDetail
            customer={customer}
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
            setIsEditOpen={setIsEditOpen}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <Info className="text-gray-300 transition-all group-hover:text-gray-500" />
              </Button>
            }
          />
          <DialogTableEdit
            customer={customer}
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
              </Button>
            }
          />
          <DialogTableDelete
            customer={customer}
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconDelete className="text-gray-300 transition-all group-hover:text-destructive" />
              </Button>
            }
          />
        </>
      );
    },
  },
];
