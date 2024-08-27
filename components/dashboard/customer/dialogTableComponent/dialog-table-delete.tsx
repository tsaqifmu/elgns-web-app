import { useDeleteCustomerData } from "@/hooks/useCustomers";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomerDialog } from "@/contexts/CustomerDialogContext";

const DialogTableDelete = () => {
  const { dialogType, customer, closeDialog } = useCustomerDialog();
  const isOpen = dialogType === "delete";

  const { mutate: deleteCustomer, isPending } = useDeleteCustomerData(
    customer?.id,
    closeDialog,
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
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
