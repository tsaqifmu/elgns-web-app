import { useShallow } from "zustand/react/shallow";
import { useDeleteCustomerData } from "@/hooks/customer/useCustomers";

import {
  DialogAction,
  DialogState,
  useDialogStore,
} from "@/stores/dialog-store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogTableDelete = () => {
  const [deleteCustomerData, closeDeleteCustomerDialog] = useDialogStore(
    useShallow((state: DialogState & DialogAction) => [
      state.deleteCustomerData,
      state.closeDeleteCustomerDialog,
    ]),
  );
  const isDialogOpen = deleteCustomerData !== undefined;
  const customer = deleteCustomerData;
  
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

export default DialogTableDelete;
