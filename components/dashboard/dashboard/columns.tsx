"use client";

import { ColumnDef } from "@tanstack/react-table";

import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { Button } from "@/components/ui/button";
import { UserDataColumns } from "@/types/admin/user-data-response";
import { WorkOrderData } from "@/types/dashboard/dashboard-data-response";
import { cn } from "@/lib/utils";

const HEADER_TITLES = {
  workOrder: "WORK ORDER",
  tanggalMasuk: "TANGGAL MASUK",
  deadline: "DEADLINE",
  atasan: "ATASAN",
  bawahan: "BAWAHAN",
  terbayar: "TERBAYAR",
  tagihan: "TAGIHAN",
  totalPembayaran: "TOTAL PEMBAYARAN",
  keterangan: "KETERANGAN",
};

const getKeteranganStyles = (keterangan: string) => {
  switch (keterangan) {
    case "PRODUKSI":
      return "bg-gray-300 text-gray-900";
    case "SELESAI":
      return "bg-teal text-white";
    case "DIKIRIM":
      return "bg-destructive text-white";
    default:
      return "bg-gray-300 text-gray-900";
  }
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const getColumnsDashboard = (): ColumnDef<WorkOrderData>[] => {
  return [
    {
      accessorKey: "workOrder",
      header: () => <ColumnHeader title={HEADER_TITLES.workOrder} />,
    },
    {
      accessorKey: "tanggalMasuk",
      header: () => <ColumnHeader title={HEADER_TITLES.tanggalMasuk} />,
    },
    {
      accessorKey: "deadline",
      header: () => <ColumnHeader title={HEADER_TITLES.deadline} />,
    },
    {
      accessorKey: "atasan",
      header: () => <ColumnHeader title={HEADER_TITLES.atasan} />,
    },
    {
      accessorKey: "bawahan",
      header: () => <ColumnHeader title={HEADER_TITLES.bawahan} />,
    },
    {
      accessorKey: "terbayar",
      header: () => <ColumnHeader title={HEADER_TITLES.terbayar} />,
    },
    {
      accessorKey: "tagihan",
      header: () => <ColumnHeader title={HEADER_TITLES.tagihan} />,
    },
    {
      accessorKey: "totalPembayaran",
      header: () => <ColumnHeader title={HEADER_TITLES.totalPembayaran} />,
    },
    {
      accessorKey: "keterangan",
      header: () => <ColumnHeader title={HEADER_TITLES.keterangan} />,
      cell: ({ row }) => {
        const keterangan: string = row.getValue("keterangan");

        return (
          <div
            className={cn(
              "rounded-full text-center uppercase", // common classes
              getKeteranganStyles(keterangan), // dynamic styles from helper function
            )}
          >
            {keterangan}
          </div>
        );
      },
    },
  ];
};
