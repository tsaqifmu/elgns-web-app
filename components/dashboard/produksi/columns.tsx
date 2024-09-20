"use client";

import { ColumnDef } from "@tanstack/react-table";
import IconDelete from "@/public/icons/table/delete.svg";
import IconEdit from "@/public/icons/table/edit.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconCdr from "@/public/icons/table/cdr.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { Button } from "@/components/ui/button";
import { ProductionItem } from "@/types/production/production-item";
import Link from "next/link";

const HEADER_TITLES = {
  invoice: "INVOICE",
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

export const getColumn = (
  openDialogEdit: (data: ProductionItem) => void,
  openDialogDelete: (data: ProductionItem) => void,
): ColumnDef<ProductionItem>[] => [
  {
    accessorKey: "invoice",
    header: () => <ColumnHeader title={HEADER_TITLES.invoice} />,
    cell: ({ getValue }) => getValue<string>().toUpperCase(), // Convert to uppercase
  },
  {
    accessorKey: "name",
    header: () => <ColumnHeader title={HEADER_TITLES.name} />,
    cell: ({ getValue }) => getValue<string>().toUpperCase(), // Convert to uppercase
  },
  {
    accessorKey: "regency",
    header: () => <ColumnHeader title={HEADER_TITLES.regency} />,
    cell: ({ getValue }) => getValue<string>().toUpperCase(), // Convert to uppercase
  },
  {
    accessorKey: "quickActions",
    header: () => <ColumnHeader title={HEADER_TITLES.quickActions} />,
    cell: ({ row }) => {
      const production: ProductionItem = row.original;
      return (
        <div className="flex items-center">
          <Button className="group" variant={"ghost"} size={"icon"}>
            <Link
              href={
                production?.imgUrl
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                      production?.imgUrl
                    }`
                  : "#"
              }
            >
              <IconImage className="h-[24px] w-[24px] text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
            </Link>
          </Button>
          <Button className="group" variant={"ghost"} size={"icon"}>
            <Link
              href={
                production?.cdrUrl
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                      production?.cdrUrl
                    }`
                  : "#"
              }
            >
              <IconCdr className="h-[24px] w-[24px] text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
            </Link>
          </Button>
          <Button className="group" variant={"ghost"} size={"icon"} disabled>
            <IconDownload className="h-[24px] w-[24px] text-[#6DB6CC] transition-all group-hover:text-[#488597]" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const production = row.original;

      return (
        <>
          <Button
            className="group"
            variant={"ghost"}
            size={"icon"}
            onClick={() => openDialogEdit(production)}
          >
            <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
          </Button>
          <Button
            className="group"
            variant={"ghost"}
            size={"icon"}
            onClick={() => openDialogDelete(production)}
          >
            <IconDelete className="text-gray-300 transition-all group-hover:text-red-500" />
          </Button>
        </>
      );
    },
  },
];
