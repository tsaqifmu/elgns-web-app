import { z } from "zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCustomerData } from "@/hooks/customer/useCustomers";

import {
  DialogAdminAction,
  DialogAdminState,
  useDialogAdminStore,
} from "@/stores/dialog-admin-store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonPending from "@/components/button-pending";
import {
  Dialog,
  DialogClose,
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
import { adminSchema } from "@/schemas/adminSchema";
import { useUpdateUserData } from "@/hooks/admin/useAdmin";
import {
  DialogBahanAction,
  DialogBahanState,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";
import { clothSchema } from "@/schemas/bahanSchema";

const DialogTableEditBahan = () => {
  const [editBahanData, closeEditBahanDialog] = useDialogBahanStore(
    useShallow((state: DialogBahanState & DialogBahanAction) => [
      state.editBahanData,
      state.closeEditBahanDialog,
    ]),
  );
  const isOpen = editBahanData !== undefined;
  const user = editBahanData;

  const form = useForm<z.infer<typeof clothSchema>>({
    resolver: zodResolver(clothSchema),
    values: {
      clothName: user?.name || "",
      color: user?.color || "",
      stock: user?.color || "",
    },
  });

  // const { mutate: updateCustomerData, isPending } = useUpdateUserData(
  //   user?.id,
  //   closeEditAdminDialog,
  // );

  function onSubmit(values: z.infer<typeof clothSchema>) {
    const payload = {
      clothName: values.clothName,
      color: values.color,
      email: values.stock,
    };
    // updateCustomerData(payload);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeEditBahanDialog}>
      <DialogContent>
        <DialogHeader className="bg-yellow-500">
          <DialogTitle>EDIT DATA BAHAN</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full gap-5 px-5 pb-5">
              <div className="flex basis-full flex-col gap-5">
                <FormField
                  control={form.control}
                  name="clothName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NAMA KAIN</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan nama kain"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Awal (KG)</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan stock"
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
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WARNA</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan warna"
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
              {/* <ButtonPending
                isPending={isPending}
                variant={"yellow"}
                size={"modalTable"}
                title="Simpan"
              /> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableEditBahan;
