import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.number().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const DialogTableCreate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-5 p-5"
      >
        <div className="flex basis-1/2 flex-col gap-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NAMA CUSTOMER</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama customer" {...field} />
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
                  <Input placeholder="62851XXXX" type="tel" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ALAMAT LENGKAP</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan alamat lengkap" {...field} />
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
                  <Input placeholder="Masukkan Alamat (Kabupaten)" {...field} />
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
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="deal">DEAL</SelectItem>
                    <SelectItem value="nego">NEGO</SelectItem>
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
                    placeholder="Tell us a little bit about yourself"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>

      {/* FOOTER SECTION */}
      <DialogFooter>
        <Button size={"modalTable"} variant={"outline"} type="submit">
          Batal
        </Button>
        <Button size={"modalTable"} variant={"default"} type="submit">
          Simpan
        </Button>
      </DialogFooter>
    </Form>
  );
};

export default DialogTableCreate;
