import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomer } from "@/lib/customerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.number().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  adress: z.string().min(2, {
    message: "Adress must be at least 2 characters.",
  }),
  regency: z.string().min(2, {
    message: "Regency must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  statusDescription: z.string().min(2, {
    message: "StatusDescription must be at least 2 characters.",
  }),
});

const DialogTableEdit = ({ customer }: { customer?: DataCustomer }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: customer?.name,
      adress: customer?.address,
      phoneNumber: customer?.phoneNumber,
      regency: customer?.address,
      status: customer?.status,
      statusDescription: customer?.statusDescription,
    },
  });

  const queryClient = useQueryClient();
  const editCustomerMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        exact: true,
        refetchType: "active",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const myData: DataCustomer = {
      id: customer!.id,
      name: values.username,
      address: values.adress,
      dateOfEntry: "",
      phoneNumber: values.phoneNumber,
      status: values.status as "DEAL" | "NEGO",
      statusDescription: values.statusDescription,
    };
    editCustomerMutation.mutate(myData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full gap-5 p-5">
          <div className="flex basis-1/2 flex-col gap-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NAMA CUSTOMER</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-yellow-500"
                      placeholder="Masukkan nama customer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NOMOR HP</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-yellow-500"
                      placeholder="62851XXXX"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ALAMAT LENGKAP</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-yellow-500"
                      placeholder="Masukkan alamat lengkap"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ASAL KABUPATEN</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-yellow-500"
                      placeholder="Masukkan Alamat (Kabupaten)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex basis-1/2 flex-col gap-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>STATUS</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-yellow-500">
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DEAL">DEAL</SelectItem>
                      <SelectItem value="NEGO">NEGO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KETERANGAN STATUS</FormLabel>
                  <FormControl>
                    <Textarea
                      className="focus-visible:ring-yellow-500"
                      placeholder="Tell us a little bit about yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            variant={"default"}
            type="submit"
            className="bg-yellow-500 uppercase"
            disabled={editCustomerMutation.isPending}
          >
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DialogTableEdit;
