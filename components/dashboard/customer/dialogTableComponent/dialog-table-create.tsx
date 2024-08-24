import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { addCustomerSchema } from "@/schemas/customerSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ButtonPending from "@/components/button-pending";
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

const DialogTableCreate = () => {
  const form = useForm<z.infer<typeof addCustomerSchema>>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      username: "",
      phoneNumber: "62",
      address: "",
      regency: "",
      status: "",
      statusDescription: "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate: sendCustomerData, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/customer/add",
        method: HttpMethod.POST,
        data,
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menyimpan data",
        description: response.data.message,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(values: z.infer<typeof addCustomerSchema>) {
    const payload = {
      name: values.username,
      noHp: values.phoneNumber,
      status: values.status as "NEGO" | "DEAL",
      alamat: values.address,
      alamatKabupaten: values.regency,
    };

    sendCustomerData(payload);
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
                      className="focus-visible:ring-teal"
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
                      className="focus-visible:ring-teal"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ALAMAT LENGKAP</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-teal"
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
                      className="focus-visible:ring-teal"
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
                      <SelectTrigger className="focus:ring-teal">
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
                      className="focus-visible:ring-teal"
                      placeholder="Tulis deskripsi status disini"
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
          <ButtonPending
            isPending={isPending}
            variant={"teal"}
            size={"modalTable"}
            title="Simpan"
          />
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DialogTableCreate;
