import { useShallow } from "zustand/react/shallow";
import { useDeleteUserData } from "@/hooks/admin/useAdmin";

import {
  DialogAdminAction,
  DialogAdminState,
  useDialogAdminStore,
} from "@/stores/dialog-admin-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogTableDeleteUser = () => {
  // Zustand store
  const [deleteAdminData, closeDeleteAdminDialog] = useDialogAdminStore(
    useShallow((state: DialogAdminState & DialogAdminAction) => [
      state.deleteAdminData,
      state.closeDeleteAdminDialog,
    ]),
  );
  const isDialogOpen = deleteAdminData !== undefined;
  const user = deleteAdminData;

  const { mutate: deleteUser, isPending } = useDeleteUserData(
    user?.id,
    closeDeleteAdminDialog,
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteAdminDialog}>
        <DialogContent className="max-w-[737px]">
          <DialogHeader className="bg-destructive">
            <DialogTitle>HAPUS DATA USER</DialogTitle>
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
            <Button
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogTableDeleteUser;
