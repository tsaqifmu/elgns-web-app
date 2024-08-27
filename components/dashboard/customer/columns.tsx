"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Info } from "lucide-react";

import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { cn } from "@/lib/utils";

import DialogTableEdit from "@/components/dashboard/customer/dialogTableComponent/dialog-table-edit";
import DialogTableDetail from "@/components/dashboard/customer/dialogTableComponent/dialog-table-detail";
import DialogTableDelete from "@/components/dashboard/customer/dialogTableComponent/dialog-table-delete";
import { Button } from "@/components/ui/button";

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

interface getColumnsParams {
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}

export const getColumns = (openDialog: any) => {
  return [
    {
      id: "initial",
      cell: ({ row }: { row: any }) => {
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
      cell: ({ row }: { row: any }) => {
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
      cell: ({ row }: { row: any }) => {
        const customer = row.original;

        return (
          <>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openDialog("detail", customer)}
            >
              <Info className="text-gray-300 transition-all group-hover:text-gray-500" />
            </Button>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openDialog("edit", customer)}
            >
              <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
            </Button>
            <Button
              className="group"
              variant={"ghost"}
              size={"icon"}
              onClick={() => openDialog("delete", customer)}
            >
              <IconDelete className="text-gray-300 transition-all group-hover:text-destructive" />
            </Button>
          </>
        );
      },
    },
  ];
};
