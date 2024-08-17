"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Info } from "lucide-react";

import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import { Button } from "@/components/ui/button";
import CustomeDialogTable from "@/components/dashboard/customer/dialog-table";

import { cn } from "@/lib/utils";
import { useState } from "react";

export type DataCustomer = {
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
    id: "initial",
    cell: ({ row }) => {
      const customerName: string = row.getValue("name");
      const status: string = row.getValue("status");

      const firstCharName = customerName.split("")[0];
      return (
        <div
          className={cn(
            "bg-teal h-6 w-6 rounded-full text-center text-white",
            status === "NEGO" ? "bg-destructive" : "bg-teal",
          )}
        >
          {firstCharName}
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
      const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false);
      return (
        <>
          <CustomeDialogTable
            variant="detail"
            title="DETAIL INFORMASI CUSTOMER"
            setIsDialogEditOpen={setIsDialogEditOpen}
            customer={customer}
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <Info className="text-gray-300 transition-all group-hover:text-gray-500" />
              </Button>
            }
          />
          <CustomeDialogTable
            variant="edit"
            title="EDIT DATA CUSTOMER"
            customer={customer}
            isOpen={isDialogEditOpen}
            onClose={() => setIsDialogEditOpen((prev) => !prev)}
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
                <IconDelete className="text-gray-300 transition-all group-hover:text-destructive" />
              </Button>
            }
          />
        </>
      );
    },
  },
];
