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
import { deleteCustomer } from "@/lib/customerService";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { toast } from "@/components/ui/use-toast";

const DialogTableDelete = ({ customer }: { customer?: DataCustomer }) => {
  // const queryClient = useQueryClient();

  console.log("customer", customer?.id);

  const { mutate: deleteCustomer, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        path: "/customer/delete",
        method: HttpMethod.DELETE,
        params: { customerid: customer?.id },
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menghapus data",
        description: response.data.message,
      });
    },
  });

  // const deleteCustomerMutation = useMutation({
  //   mutationFn: deleteCustomer,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["customers"] });
  //   },
  // });

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
          disabled={isPending}
          onClick={() => {
            deleteCustomer();
            // deleteCustomerMutation.mutate(customer!.id);
          }}
        >
          Hapus
        </Button>
      </DialogFooter>
    </>
  );
};

export default DialogTableDelete;
