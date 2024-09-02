import React, { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import { useShallow } from "zustand/react/shallow";
import ButtonPending from "@/components/button-pending";
import { useDeleteProduction } from "@/hooks/production/useDeleteProduction";

const DialogTableDelete = () => {
  const [deleteProductionData, closeDeleteProductionDialog] =
    useDialogProductionStore(
      useShallow((state: DialogProductionState & DialogProductionAction) => [
        state.deleteProductionData,
        state.closeDeleteProductionDialog,
      ]),
    );
  const production = deleteProductionData;
  const isOpen = production !== undefined;
  const { mutate: deleteProduction, isPending } = useDeleteProduction(
    production?.id,
    closeDeleteProductionDialog,
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    deleteProduction();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDeleteProductionDialog}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-destructive">
            <DialogTitle>HAPUS DATA PRODUKSI</DialogTitle>
          </DialogHeader>
          <div className="h-80 p-5">
            <p className="text-base font-normal">
              Data Produksi{" "}
              <span className="font-bold">{production?.name ?? ""}</span> akan
              dihapus, Anda Yakin?
            </p>
          </div>

          {/* FOOTER SECTION */}
          <DialogFooter>
            <DialogClose>
              <Button
                size={"modalTable"}
                variant={"outline"}
                className="uppercase"
              >
                BATAL
              </Button>
            </DialogClose>
            <ButtonPending
              size={"modalTable"}
              variant={"destructive"}
              className="uppercase"
              title="HAPUS"
              isPending={isPending}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableDelete;
