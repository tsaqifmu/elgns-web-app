import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DialogTableDelete = ({ content }: { content: string }) => {
  return (
    <>
      <div className="h-80 p-5">
        <p className="text-base font-normal">
          Data Customer <span className="font-bold">{content}</span> akan
          dihapus, Anda Yakin?
        </p>
      </div>

      {/* FOOTER SECTION */}
      <DialogFooter>
        <Button size={"modalTable"} variant={"outline"} type="submit">
          Batal
        </Button>
        <Button size={"modalTable"} variant={"destructive"} type="submit">
          Hapus
        </Button>
      </DialogFooter>
    </>
  );
};

export default DialogTableDelete;
