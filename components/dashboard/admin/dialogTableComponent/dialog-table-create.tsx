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

import { adminSchema } from "@/schemas/adminSchema";

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

const LIST_ROLE = [
  {
    value: "pekerja_design",
    title: "PEKERJA DESIGN",
  },
  {
    value: "pekerja_profing",
    title: "PEKERJA PROFING",
  },
  {
    value: "pekerja_mal",
    title: "PEKERJA MAL",
  },
  {
    value: "pekerja_printing",
    title: "PEKERJA PRINTING",
  },
  {
    value: "pekerja_potong",
    title: "PEKERJA POTONG",
  },
];

const DialogTableCreateUser = () => {
  const [createCustomerData, closeCreateCustomerDialog] = useDialogAdminStore(
    useShallow((state: DialogAdminState & DialogAdminAction) => [
      state.createAdminData,
      state.closeCreateAdminDialog,
    ]),
  );
  const isDialogOpen = createCustomerData;

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: "",
      phoneNumber: "62",
      email: "",
      password: "",
      role: "",
    },
  });

  const { mutate: sendCustomerData, isPending } = useAddCustomerData(
    closeCreateCustomerDialog,
  );

  function onSubmit(values: z.infer<typeof adminSchema>) {
    const payload = {
      name: values.username,
      noHp: values.phoneNumber,
      email: values.email,
      password: values.password,
      role: values.role,
    };

    sendCustomerData(payload);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeCreateCustomerDialog}>
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
                      <FormLabel>NAMA PEKERJA</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-teal"
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
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-teal"
                          placeholder="Masukkan alamat email"
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
                          className="focus-visible:ring-teal"
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
                  name="role"
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
                          {LIST_ROLE.map((data) => (
                            <SelectItem value={data.value}>
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

export default DialogTableCreateUser;
