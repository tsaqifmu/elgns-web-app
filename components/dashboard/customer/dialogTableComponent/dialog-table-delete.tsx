import { ReactNode, useState } from "react";

import IconDelete from "@/public/icons/table/delete.svg";
import { useDeleteCustomerData } from "@/hooks/useCustomers";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";

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

const DialogTableDelete = ({ customer }: { customer: DataCustomer }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: deleteCustomer, isPending } = useDeleteCustomerData(
    customer?.id,
    setIsDialogOpen,
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="group" variant={"ghost"} size={"icon"}>
            <IconDelete className="text-gray-300 transition-all group-hover:text-destructive" />
          </Button>
        </DialogTrigger>
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
