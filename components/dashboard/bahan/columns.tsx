"use client";

import { ColumnDef } from "@tanstack/react-table";

import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { Button } from "@/components/ui/button";
import { BahanDataColumns } from "@/types/bahan/bahan-data-response";
import { cn } from "@/lib/utils";

const HEADER_TITLES = {
  name: "NAMA ",
  weight: "BERAT (KG)",
  used: "TERPAKAI",
  stock: "STOCK AKHIR",
  quickAccess: "AKSI CEPAT",
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const getColumnsBahan = (
  openEditDialog: (data: BahanDataColumns) => void,
  openDeleteDialog: (data: BahanDataColumns) => void,
): ColumnDef<BahanDataColumns>[] => {
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
              "flexCenter h-6 w-6 rounded-full text-center uppercase text-white",
              status === "NEGO" ? "bg-destructive" : "bg-gray-900",
            )}
          >
            <p>{firstCharName}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <ColumnHeader title={HEADER_TITLES.name} />,
    },
    {
      accessorKey: "weight",
      header: () => <ColumnHeader title={HEADER_TITLES.weight} />,
    },
    {
      accessorKey: "used",
      header: () => <ColumnHeader title={HEADER_TITLES.used} />,
    },
    {
      accessorKey: "stock",
      header: () => <ColumnHeader title={HEADER_TITLES.stock} />,
    },

    {
      id: "actions",
      header: () => <ColumnHeader title={HEADER_TITLES.quickAccess} />,
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <>
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
