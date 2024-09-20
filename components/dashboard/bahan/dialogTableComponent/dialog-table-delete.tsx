import { useShallow } from "zustand/react/shallow";
import { useDeleteUserData } from "@/hooks/admin/useAdmin";

import {
  DialogBahanAction,
  DialogBahanState,
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
  const [deleteBahanData, closeDeleteBahanDialog] = useDialogBahanStore(
    useShallow((state: DialogBahanState & DialogBahanAction) => [
      state.deleteBahanData,
      state.closeDeleteBahanDialog,
    ]),
  );
  const isDialogOpen = deleteBahanData !== undefined;
  const user = deleteBahanData;

  // const { mutate: deleteUser, isPending } = useDeleteUserData(
  //   user?.id,
  //   closeDeleteBahanDialog,
  // );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteBahanDialog}>
        <DialogContent className="max-w-[737px]">
          <DialogHeader className="bg-destructive">
            <DialogTitle>HAPUS DATA BAHAN</DialogTitle>
          </DialogHeader>

          <div className="h-80 px-5 pb-5">
            <p className="text-base font-normal">
              Data Customer <span className="font-bold">{user?.name}</span> akan
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
            {/* <Button
              size={"modalTable"}
              variant={"destructive"}
              type="submit"
              className="uppercase"
              disabled={isPending}
              onClick={() => {
                deleteUser();
              }}
            >
              Hapus
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogTableDeleteBahan;
