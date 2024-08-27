import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataCustomer } from "@/components/dashboard/customer/columns";
import { customerSchema } from "@/schemas/customerSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
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

interface DialogTableDetailProps {
  customer: DataCustomer;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogTableDetail = ({
  customer,
  setIsEditOpen,
}: DialogTableDetailProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log("customer dari detail", customer);

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

  const handleEdit = (e: any) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setIsEditOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="group" variant={"ghost"} size={"icon"}>
          <Info className="text-gray-300 transition-all group-hover:text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[737px]">
        <DialogHeader className="bg-gray-900">
          <DialogTitle>DETAIL INFORMASI CUSTOMER</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                          readOnly
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
                        disabled
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                          readOnly
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
              <Button
                size={"modalTable"}
                variant={"default"}
                className="bg-gray-900"
                onClick={handleEdit}
              >
                EDIT
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableDetail;
