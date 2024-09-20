import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  DialogAction,
  DialogState,
  useDialogStore,
} from "@/stores/dialog-store";
import { useShallow } from "zustand/react/shallow";

const DialogTableDetail = () => {
  const [
    detailCustomerData,
    closeDetailCustomerDialog,
    openEditCustomerDialog,
  ] = useDialogStore(
    useShallow((state: DialogState & DialogAction) => [
      state.detailCustomerData,
      state.closeDetailCustomerDialog,
      state.openEditCustomerDialog,
    ]),
  );
  const isDialogOpen = detailCustomerData !== undefined;
  const customer = detailCustomerData;
  console.log("render detail");

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

  const onSubmit = (e: any) => {
    e.preventDefault();
    openEditCustomerDialog(customer!);
    closeDetailCustomerDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDetailCustomerDialog}>
      <DialogContent className="max-w-[737px]">
        <DialogHeader className="bg-gray-900">
          <DialogTitle>DETAIL INFORMASI CUSTOMER</DialogTitle>
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
                onClick={onSubmit}
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
