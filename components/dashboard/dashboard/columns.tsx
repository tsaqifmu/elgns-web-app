"use client";

import { ColumnDef } from "@tanstack/react-table";

import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { Button } from "@/components/ui/button";
import { UserDataColumns } from "@/types/admin/user-data-response";
import { WorkOrderData } from "@/types/dashboard/dashboard-data-response";
import { cn } from "@/lib/utils";

const HEADER_TITLES = {
  noInvoice: "WORK ORDER",
  tanggalMasuk: "TANGGAL MASUK",
  tanggalKeluar: "TANGGAL KELUAR",
  baju: "BAJU",
  celana: "CELANA",
  terbayar: "TERBAYAR",
  tagihan: "TAGIHAN",
  totalPembayaran: "TOTAL PEMBAYARAN",
  status: "STATUS",
};

const getKeteranganStyles = (status: string) => {
  switch (status) {
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
      accessorKey: "noInvoice",
      header: () => <ColumnHeader title={HEADER_TITLES.noInvoice} />,
    },
    {
      accessorKey: "tglMasuk",
      header: () => <ColumnHeader title={HEADER_TITLES.tanggalMasuk} />,
    },
    {
      accessorKey: "tglKeluar",
      header: () => <ColumnHeader title={HEADER_TITLES.tanggalKeluar} />,
    },
    {
      accessorKey: "totalBaju",
      header: () => <ColumnHeader title={HEADER_TITLES.baju} />,
    },
    {
      accessorKey: "totalCelana",
      header: () => <ColumnHeader title={HEADER_TITLES.celana} />,
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
      accessorKey: "totalBayar",
      header: () => <ColumnHeader title={HEADER_TITLES.totalPembayaran} />,
    },
    {
      accessorKey: "status",
      header: () => <ColumnHeader title={HEADER_TITLES.status} />,
      cell: ({ row }) => {
        const keterangan: string = row.getValue("status");

        return (
          <div
            className={cn(
              "rounded-full p-2 text-center uppercase",
              getKeteranganStyles(keterangan),
            )}
          >
            {keterangan}
          </div>
        );
      },
    },
  ];
};
