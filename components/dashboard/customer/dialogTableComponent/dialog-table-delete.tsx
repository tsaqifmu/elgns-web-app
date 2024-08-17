import React from "react";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "@/lib/customerService";

const DialogTableDelete = ({ customer }: { customer?: DataCustomer }) => {
  const queryClient = useQueryClient();

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return (
    <>
      <div className="h-80 p-5">
        <p className="text-base font-normal">
          Data Customer <span className="font-bold">{customer?.name}</span> akan
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
          disabled={deleteCustomerMutation.isPending}
          onClick={() => {
            deleteCustomerMutation.mutate(customer!.id);
          }}
        >
          Hapus
        </Button>
      </DialogFooter>
    </>
  );
};

export default DialogTableDelete;
