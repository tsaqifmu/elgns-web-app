"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Info } from "lucide-react";
import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DialogAction } from "@/stores/dialog-store";

export type DataCustomer = {
  id: string;
  dateOfEntry: string;
  name: string;
  phoneNumber: string;
  regency: string;
  status: string;
  statusDescription: string;
  address: string;
};

const HEADER_TITLES = {
  dateOfEntry: "TANGGAL MASUK",
  phoneNumber: "NOMOR HP",
  name: "NAMA CUSTOMER",
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

export const getColumns = (
  openDetailDialog: (data: DataCustomer) => void,
  openEditDialog: (data: DataCustomer) => void,
  openDeleteDialog: (data: DataCustomer) => void,
): ColumnDef<DataCustomer>[] => {
  return [
    {
      id: "initial",
      cell: ({ row }) => {
        const customerName: string = row.getValue("name");
        const status: string = row.getValue("status");
        const firstCharName = customerName?.split("")[0];

        return (
          <div
            className={cn(
              "flexCenter h-6 w-6 rounded-full bg-teal text-center text-white",
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

        return (
          <>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openDetailDialog(customer)}
            >
              <Info className="text-gray-300 transition-all group-hover:text-gray-500" />
            </Button>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openEditDialog(customer)}
            >
              <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
            </Button>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openDeleteDialog(customer)}
            >
              <IconDelete className="text-gray-300 transition-all group-hover:text-destructive" />
            </Button>
          </>
        );
      },
    },
  ];
};
