"use client";

import { ColumnDef } from "@tanstack/react-table";
import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconCdr from "@/public/icons/table/cdr.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { Button } from "@/components/ui/button";
import CustomeDialogTable from "@/components/dashboard/produksi/dialog-table";
import DialogTableEditTes from "@/components/dashboard/produksi/dialogTableComponent/dialog-table-edit";

export type DataProduksi = {
  id: string;
  invoice: string;
  dateOfEntry: string;
  dateOfExit: string;
  name: string;
  address: string;
};

// Konstanta untuk teks header
const HEADER_TITLES = {
  invoice: "INVOICE",
  dateOfEntry: "TANGGAL MASUK",
  dateOfExit: "TANGGAL KELUAR",
  name: "NAMA CUSTOMER",
  address: "ALAMAT",
  quickActions: "AKSI CEPAT",
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const columns: ColumnDef<DataProduksi>[] = [
  {
    accessorKey: "invoice",
    header: () => <ColumnHeader title={HEADER_TITLES.invoice} />,
  },
  {
    accessorKey: "dateOfEntry",
    header: () => <ColumnHeader title={HEADER_TITLES.dateOfEntry} />,
  },
  {
    accessorKey: "dateOfExit",
    header: () => <ColumnHeader title={HEADER_TITLES.dateOfExit} />,
  },
  {
    accessorKey: "name",
    header: () => <ColumnHeader title={HEADER_TITLES.name} />,
  },
  {
    accessorKey: "address",
    header: () => <ColumnHeader title={HEADER_TITLES.address} />,
  },
  {
    accessorKey: "quickActions",
    header: () => <ColumnHeader title={HEADER_TITLES.quickActions} />,
    cell: ({ row }) => {
      const customerName = row.getValue("name");
      return (
        <div className="flex items-center">
          <Button className="group" variant={"ghost"} size={"icon"}>
            <IconImage className="text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
          </Button>
          <Button className="group" variant={"ghost"} size={"icon"}>
            <IconCdr className="text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
          </Button>
          <Button className="group" variant={"ghost"} size={"icon"}>
            <IconDownload className="text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <DialogTableEditTes
            triger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
              </Button>
            }
          />
          <CustomeDialogTable
            variant="hapus"
            title="HAPUS DATA PRODUKSI"
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
