"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck } from "lucide-react";

export type Payment = {
  id: string;
  dateOfEntry: string;
  name: string;
  phoneNumber: number;
  address: string;
  status: "NEGO" | "DEAL";
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

export const columns: ColumnDef<Payment>[] = [
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
      const amount: string = row.getValue("status");
      return (
        <div className="flex w-fit items-center space-x-1 rounded-full bg-[#5BADC5] px-[0.625rem] py-1 text-[0.625rem] text-white lg:w-20 lg:py-[0.3125rem] lg:text-sm">
          <CircleCheck className="w-4 lg:w-6" />
          <p>{amount}</p>
        </div>
      );
    },
  },
];
