import { z } from "zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCustomerData } from "@/hooks/customer/useCustomers";

import {
  DialogAdminAction,
  DialogAdminState,
  useDialogAdminStore,
} from "@/stores/dialog-admin-store";

import { clothSchema } from "@/schemas/bahanSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import {
  DialogBahanAction,
  DialogBahanState,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

const DialogTableCreateBahan = () => {
  const [createBahanData, closeCreateBahanDialog] = useDialogBahanStore(
    useShallow((state: DialogBahanState & DialogBahanAction) => [
      state.createBahanData,
      state.closeCreateBahanDialog,
    ]),
  );
  const isDialogOpen = createBahanData;

  console.log(isDialogOpen);

  const form = useForm<z.infer<typeof clothSchema>>({
    resolver: zodResolver(clothSchema),
    defaultValues: {
      clothName: "",
      color: "",
      stock: "",
    },
  });

  // const { mutate: sendUserData, isPending } = useAddUserData(
  //   closeCreateAdminDialog,
  // );

  function onSubmit(values: z.infer<typeof clothSchema>) {
    const payload = {
      clothName: values.clothName,
      color: values.color,
      email: values.stock,
    };

    // sendUserData(payload);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeCreateBahanDialog}>
      <DialogContent>
        <DialogHeader className="bg-teal">
          <DialogTitle>MENAMBAH DATA BAHAN</DialogTitle>
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
                          className="focus-visible:ring-teal"
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
                      <FormLabel>STOCK AWAL (KG)</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-teal"
                          placeholder="Masukkan stock"
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
                          className="focus-visible:ring-teal"
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
                // isPending={isPending}
                variant={"teal"}
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

export default DialogTableCreateBahan;
