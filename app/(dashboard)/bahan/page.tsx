"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  DialogBahanAction,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { getColumnsBahan } from "@/components/dashboard/bahan/columns";
import DialogTableCreateBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-create";
import DialogTableDeleteBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-delete";
import DialogTableEditBahan from "@/components/dashboard/bahan/dialogTableComponent/dialog-table-edit";

export type BahanDataColumns = {
  id: string;
  name: string;
  weight: string;
  used: string;
  stock: string;
};

const dataSource: BahanDataColumns[] = [
  {
    id: "1",
    name: "jaka",
    stock: "12",
    used: "10",
    weight: "10",
  },
  {
    id: "1",
    name: "jaka",
    stock: "12",
    used: "10",
    weight: "10",
  },
  {
    id: "1",
    name: "jaka",
    stock: "12",
    used: "10",
    weight: "10",
  },
  {
    id: "1",
    name: "jaka",
    stock: "12",
    used: "10",
    weight: "10",
  },
  {
    id: "1",
    name: "jaka",
    stock: "12",
    used: "10",
    weight: "10",
  },
];

const BahanPage = () => {
  const [cloth, setCloth] = useState<string>("white");

  // Zustand store
  const [openCreateBahanDialog, openEditBahanDialog, openDeleteBahanDialog] =
    useDialogBahanStore(
      useShallow((state: DialogBahanAction) => [
        state.openCreateBahanDialog,
        state.openEditBahanDialog,
        state.openDeleteBahanDialog,
      ]),
    );

  console.log(openCreateBahanDialog);

  const columns = getColumnsBahan(openEditBahanDialog, openDeleteBahanDialog);

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="w-full space-x-2">
          <Button
            variant={"outline"}
            className="border-teal bg-teal/20 text-xs font-bold uppercase text-teal lg:text-lg"
            // onClick={openCreateAdminDialog}
          >
            <p>KAIN PUTIH</p>
          </Button>
          <Button
            variant={"outline"}
            className="space-x-1 text-xs uppercase lg:space-x-3 lg:text-base"
            // onClick={openCreateAdminDialog}
          >
            <p>KAIN WARNA</p>
          </Button>
        </div>
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
          onClick={openCreateBahanDialog}
        >
          <p>TAMBAH KAIN</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>
      </header>
      <main className="mt-9">
        <DataTable columns={columns} data={dataSource as any} />
        <DialogTableCreateBahan />
        <DialogTableEditBahan />
        <DialogTableDeleteBahan />
      </main>
    </>
  );
};

export default BahanPage;
