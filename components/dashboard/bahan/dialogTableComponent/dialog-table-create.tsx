import { z } from "zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAddFabricData } from "@/hooks/bahan/useBahan";

import { fabricSchema } from "@/schemas/bahanSchema";

import {
  DialogFabricAction,
  DialogFabricState,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogTableCreateFabric = () => {
  const [createFabricData, closeCreateFabricDialog] = useDialogBahanStore(
    useShallow((state: DialogFabricState & DialogFabricAction) => [
      state.createFabricData,
      state.closeCreateFabricDialog,
    ]),
  );
  const isDialogOpen = createFabricData;

  const form = useForm<z.infer<typeof fabricSchema>>({
    resolver: zodResolver(fabricSchema),
  });

  const { mutate: sendFabricData, isPending } = useAddFabricData(
    closeCreateFabricDialog,
  );

  function onSubmit(values: z.infer<typeof fabricSchema>) {
    console.log(values.stock);
    const payload = {
      name: values.fabricName,
      color: values.color,
      stock: values.stock,
    };

    sendFabricData(payload);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeCreateFabricDialog}>
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
                  name="fabricName"
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
                          type="number"
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

export default DialogTableCreateFabric;
