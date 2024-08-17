import React from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DialogTableDelete = ({ content }: { content?: string }) => {
  return (
    <>
      <div className="h-80 p-5">
        <p className="text-base font-normal">
          Data Produksi <span className="font-bold">{content ?? ""}</span> akan
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
        >
          Hapus
        </Button>
      </DialogFooter>
    </>
  );
};

export default DialogTableDelete;
