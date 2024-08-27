import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import IconEdit from "@/public/icons/table/edit.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataCustomer } from "@/components/dashboard/customer/columns";
import { customerSchema } from "@/schemas/customerSchema";
import { useUpdateCustomerData } from "@/hooks/useCustomers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ButtonPending from "@/components/button-pending";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface DialogTableEditProps {
  customer?: DataCustomer;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogTableEdit = ({
  customer,
  isOpen,
  setIsOpen,
}: DialogTableEditProps) => {
  console.log("customer dari edit", customer);
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    values: {
      username: customer?.name || "",
      address: customer?.address || "",
      phoneNumber: customer?.phoneNumber || "",
      regency: customer?.regency || "",
      status: customer?.status || "",
      statusDescription: customer?.statusDescription || "",
    },
  });

  const { mutate: updateCustomerData, isPending } = useUpdateCustomerData(
    customer?.id,
    setIsOpen,
  );

  function onSubmit(values: z.infer<typeof customerSchema>) {
    const payload = {
      name: values.username,
      noHp: values.phoneNumber,
      status: values.status,
      alamat: values.address,
      alamatKabupaten: values.regency,
      info: values.statusDescription,
    };
    console.log(payload);
    updateCustomerData(payload);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="group" variant={"ghost"} size={"icon"}>
          <IconEdit className="text-gray-300 transition-all group-hover:text-yellow-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[737px]">
        <DialogHeader className="bg-yellow-500">
          <DialogTitle>EDIT DATA CUSTOMER</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full gap-5 px-5 pb-5">
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
                  name="address"
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
                          placeholder="Keterangan status"
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
                variant={"yellow"}
                size={"modalTable"}
                title="Simpan"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableEdit;
