import { useShallow } from "zustand/react/shallow";
import { useDeleteFabricData } from "@/hooks/bahan/useBahan";

import {
  DialogFabricAction,
  DialogFabricState,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogTableDeleteBahan = () => {
  // Zustand store
  const [deleteFabricData, closeDeleteFabricDialog] = useDialogBahanStore(
    useShallow((state: DialogFabricState & DialogFabricAction) => [
      state.deleteFabricData,
      state.closeDeleteFabricDialog,
    ]),
  );

  const isDialogOpen = deleteFabricData !== undefined;
  const fabric = deleteFabricData;

  const { mutate: deleteFabric, isPending } = useDeleteFabricData(
    fabric?.id,
    closeDeleteFabricDialog,
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteFabricDialog}>
        <DialogContent className="max-w-[737px]">
          <DialogHeader className="bg-destructive">
            <DialogTitle>HAPUS DATA BAHAN</DialogTitle>
          </DialogHeader>

          <div className="h-80 px-5 pb-5">
            <p className="text-base font-normal">
              Data Bahan <span className="font-bold">{fabric?.name}</span> akan
              dihapus, Anda Yakin?
            </p>
          </div>

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
              disabled={isPending}
              onClick={() => {
                deleteFabric();
              }}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogTableDeleteBahan;
