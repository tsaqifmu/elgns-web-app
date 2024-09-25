import { z } from "zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { fabricUpdateStockSchema } from "@/schemas/bahanSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateFabricData } from "@/hooks/bahan/useBahan";

import {
  DialogFabricAction,
  DialogFabricState,
  useDialogBahanStore,
} from "@/stores/dialog-bahan-store";

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

const DialogTableEditBahan = () => {
  const [editFabricData, closeEditFabricDialog] = useDialogBahanStore(
    useShallow((state: DialogFabricState & DialogFabricAction) => [
      state.editFabricData,
      state.closeEditFabricDialog,
    ]),
  );
  const isOpen = editFabricData !== undefined;
  const fabric = editFabricData;

  const form = useForm<z.infer<typeof fabricUpdateStockSchema>>({
    resolver: zodResolver(fabricUpdateStockSchema),
  });

  const { mutate: updateFabricData, isPending } = useUpdateFabricData(
    fabric?.id,
    closeEditFabricDialog,
  );

  function onSubmit(values: z.infer<typeof fabricUpdateStockSchema>) {
    const payload = {
      stock: values.stock,
    };
    updateFabricData(payload);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeEditFabricDialog}>
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
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock (KG)</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan stock"
                          type="number"
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

export default DialogTableEditBahan;
