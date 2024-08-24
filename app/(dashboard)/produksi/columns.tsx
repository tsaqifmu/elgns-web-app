"use client";

import { ColumnDef } from "@tanstack/react-table";
import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconCdr from "@/public/icons/table/cdr.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { Button } from "@/components/ui/button";
import DialogTableEdit from "@/components/dashboard/produksi/dialogTableComponent/dialog-table-edit";
import { Production } from "@/hooks/useFetchProductions";
import DialogTableDelete from "@/components/dashboard/produksi/dialogTableComponent/dialog-table-delete";
import { useState } from "react";
import { formatToIndonesianDate } from "@/lib/dateUtils";

// Konstanta untuk teks header
const HEADER_TITLES = {
  invoice: "INVOICE",
  dateOfEntry: "TANGGAL MASUK",
  dateOfExit: "TANGGAL KELUAR",
  name: "NAMA CUSTOMER",
  regency: "ALAMAT",
  quickActions: "AKSI CEPAT",
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const columns: ColumnDef<Production>[] = [
  {
    accessorKey: "invoice",
    header: () => <ColumnHeader title={HEADER_TITLES.invoice} />,
  },
  {
    accessorKey: "dateOfEntry",
    header: () => <ColumnHeader title={HEADER_TITLES.dateOfEntry} />,
    cell: ({ row }) => {
      const formattedDate = formatToIndonesianDate(row.getValue("dateOfEntry"));
      return formattedDate;
    },
  },
  {
    accessorKey: "dateOfExit",
    header: () => <ColumnHeader title={HEADER_TITLES.dateOfExit} />,
    cell: ({ row }) => {
      const formattedDate = formatToIndonesianDate(row.getValue("dateOfExit"));
      return formattedDate;
    },
  },
  {
    accessorKey: "name",
    header: () => <ColumnHeader title={HEADER_TITLES.name} />,
  },
  {
    accessorKey: "regency",
    header: () => <ColumnHeader title={HEADER_TITLES.regency} />,
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
      const production = row.original;
      const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false);
      const [IsDialogDeleteOpen, setIsDialogDeleteOpen] =
        useState<boolean>(false);

      return (
        <>
          <DialogTableEdit
            production={production}
            isOpen={isDialogEditOpen}
            setIsOpen={setIsDialogEditOpen}
            trigger={
              <Button className="group" variant={"ghost"} size={"icon"}>
                <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
              </Button>
            }
          />
          <DialogTableDelete
            isOpen={IsDialogDeleteOpen}
            setIsOpen={setIsDialogDeleteOpen}
            production={production}
            trigger={
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
