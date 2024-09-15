import { useShallow } from "zustand/react/shallow";
import { useDeleteCustomerData } from "@/hooks/customer/useCustomers";

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

//! tinggal connect ke API delete
const DialogTableDeleteUser = () => {
  // Zustand store
  const [deleteCustomerData, closeDeleteCustomerDialog] = useDialogAdminStore(
    useShallow((state: DialogAdminState & DialogAdminAction) => [
      state.deleteAdminData,
      state.closeDeleteAdminDialog,
    ]),
  );
  const isDialogOpen = deleteCustomerData !== undefined;
  const customer = deleteCustomerData;

  //! API belum dikerjakan
  const { mutate: deleteCustomer, isPending } = useDeleteCustomerData(
    customer?.id,
    closeDeleteCustomerDialog,
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDeleteCustomerDialog}>
        <DialogContent className="max-w-[737px]">
          <DialogHeader className="bg-destructive">
            <DialogTitle>HAPUS DATA CUSTOMER</DialogTitle>
          </DialogHeader>

          <div className="h-80 px-5 pb-5">
            <p className="text-base font-normal">
              Data Customer <span className="font-bold">{customer?.name}</span>{" "}
              akan dihapus, Anda Yakin?
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
                deleteCustomer();
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
