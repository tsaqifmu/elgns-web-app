import React, { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Production } from "@/hooks/useFetchProductions";

interface DialogTableDeleteProps {
  production: Production;
  trigger: any;
  isOpen: boolean;
  setIsOpen: any;
}

const DialogTableDelete: FC<DialogTableDeleteProps> = ({
  production,
  trigger,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="bg-destructive">
          <DialogTitle>HAPUS DATA PRODUKSI</DialogTitle>
        </DialogHeader>
        <div className="h-80 p-5">
          <p className="text-base font-normal">
            Data Produksi{" "}
            <span className="font-bold">{production.name ?? ""}</span> akan
            dihapus, Anda Yakin?
          </p>
        </div>

        {/* FOOTER SECTION */}
        <DialogFooter>
          <DialogClose>
            <Button
              size={"modalTable"}
              variant={"outline"}
              type="submit"
              className="uppercase"
            >
              Batal
            </Button>
          </DialogClose>
          <Button
            size={"modalTable"}
            variant={"destructive"}
            type="submit"
            className="uppercase"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableDelete;
