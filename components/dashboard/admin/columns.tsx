"use client";

import { ColumnDef } from "@tanstack/react-table";

import IconEdit from "@/public/icons/table/edit.svg";
import IconDelete from "@/public/icons/table/delete.svg";

import { Button } from "@/components/ui/button";
import { UserDataColumns } from "@/types/admin/user-data-response";

const HEADER_TITLES = {
  name: "NAMA ",
  email: "EMAIL",
  phoneNumber: "NOMOR HP",
  role: "ROLE",
  quickAccess: "AKSI CEPAT",
};

const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-900 lg:text-base lg:font-bold">
      {title}
    </div>
  );
};

export const getColumnsAdmin = (
  openEditDialog: (data: UserDataColumns) => void,
  openDeleteDialog: (data: UserDataColumns) => void,
): ColumnDef<UserDataColumns>[] => {
  return [
    {
      accessorKey: "name",
      header: () => <ColumnHeader title={HEADER_TITLES.name} />,
    },
    {
      accessorKey: "email",
      header: () => <ColumnHeader title={HEADER_TITLES.email} />,
    },
    {
      accessorKey: "phoneNumber",
      header: () => <ColumnHeader title={HEADER_TITLES.phoneNumber} />,
    },
    {
      accessorKey: "role",
      header: () => <ColumnHeader title={HEADER_TITLES.role} />,
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("role")}</div>
      ),
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
