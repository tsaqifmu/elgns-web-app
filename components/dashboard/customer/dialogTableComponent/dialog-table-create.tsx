import { z } from "zod";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { customerSchema } from "@/schemas/customerSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ButtonPending from "@/components/button-pending";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddCustomerData } from "@/hooks/useCustomers";

const DialogTableCreate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      username: "",
      phoneNumber: "62",
      address: "",
      phoneNumber: "62",
      address: "",
      regency: "",
      status: "",
      statusDescription: "",
    },
  });

  const { mutate: sendCustomerData, isPending } =
    useAddCustomerData(setIsDialogOpen);

  function onSubmit(values: z.infer<typeof customerSchema>) {
    const payload = {
  function onSubmit(values: z.infer<typeof customerSchema>) {
    const payload = {
      name: values.username,
      noHp: values.phoneNumber,
      status: values.status,
      alamat: values.address,
      alamatKabupaten: values.regency,
      info: values.statusDescription,
    };

    sendCustomerData(payload);
    sendCustomerData(payload);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"teal"}
          className="space-x-1 text-xs lg:space-x-3 lg:text-base"
        >
          <p>TAMBAH CUSTOMER</p>
          <CirclePlus className="w-4 lg:w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[737px]">
        <DialogHeader className="bg-teal">
          <DialogTitle>MENAMBAH DATA CUSTOMER</DialogTitle>
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
      </DialogContent>
    </Dialog>
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
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableCreate;
