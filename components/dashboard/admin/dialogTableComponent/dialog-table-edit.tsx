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
import { LIST_ROLE } from "./dialog-table-create";
import { useUpdateUserData } from "@/hooks/admin/useAdmin";

const DialogTableEditUser = () => {
  const [editAdminData, closeEditAdminDialog] = useDialogAdminStore(
    useShallow((state: DialogAdminState & DialogAdminAction) => [
      state.editAdminData,
      state.closeEditAdminDialog,
    ]),
  );
  const isOpen = editAdminData !== undefined;
  const user = editAdminData;

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    values: {
      username: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      password: user?.password || "",
      role: user?.role || "",
    },
  });

  const { mutate: updateCustomerData, isPending } = useUpdateUserData(
    user?.id,
    closeEditAdminDialog,
  );

  function onSubmit(values: z.infer<typeof adminSchema>) {
    const payload = {
      name: values.username,
      noHp: values.phoneNumber,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    updateCustomerData(payload);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeEditAdminDialog}>
      <DialogContent className="max-w-[737px]">
        <DialogHeader className="bg-yellow-500">
          <DialogTitle>EDIT DATA USER</DialogTitle>
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
                      <FormLabel>NAMA PEKERJA</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan nama pekerja"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan alamat email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PASSWORD</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-yellow-500"
                          placeholder="Masukkan password"
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ROLE</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-yellow-500">
                            <SelectValue placeholder="Pilih Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LIST_ROLE.map((data, index) => (
                            <SelectItem key={index} value={data.value}>
                              {data.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

export default DialogTableEditUser;
