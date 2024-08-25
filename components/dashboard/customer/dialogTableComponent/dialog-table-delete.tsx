import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCustomer } from "@/lib/customerService";
import { cn } from "@/lib/utils";

const DialogTableDelete = ({
  customer,
  triger,
  isOpen,
  setIsOpen,
}: {
  customer?: DataCustomer;
  triger: any;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const queryClient = useQueryClient();

  // const deleteCustomerMutation = useMutation({
  //   mutationFn: deleteCustomer,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["customers"] });
  //   },
  // });

  const handleDelete = () => {
    // deleteCustomerMutation.mutate(customer!.id);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triger}</DialogTrigger>
        <DialogContent className="max-w-[737px]">
          <DialogHeader className={cn("bg-destructive")}>
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
              // disabled={deleteCustomerMutation.isPending}
              onClick={handleDelete}
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
