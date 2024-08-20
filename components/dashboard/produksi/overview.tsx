import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import imgBaju from "@/public/images/dialog-image.png";
import IconCdr from "@/public/icons/table/cdr.svg";
import { produksiOverviewSchema } from "@/schemas/produksiOverviewSchema";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Overview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof produksiOverviewSchema>>({
    resolver: zodResolver(produksiOverviewSchema),
    defaultValues: {
      jenis: "BASEBALL FULLPRINT, KAOS, LANYARD",
    },
  });

  function onSubmit(values: z.infer<typeof produksiOverviewSchema>) {
    console.log("halo");
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-8 px-5 pb-5">
          <div className="flex basis-1/2 flex-col gap-4">
            <FormItem>
              <FormLabel>NAMA CUSTOMER</FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  className="border border-gray-300"
                  placeholder="Masukkan nama customer"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>NOMOR HP</FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  className="border border-gray-300"
                  placeholder="62851XXXX"
                  type="tel"
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>ALAMAT LENGKAP</FormLabel>
              <FormControl>
                <Textarea
                  disabled={true}
                  className="border border-gray-300"
                  placeholder="Jl. Raya"
                  rows={4}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>CATATAN</FormLabel>
              <FormControl>
                <Textarea
                  disabled={true}
                  className="border border-gray-300"
                  placeholder="Masukkan catatan"
                  rows={4}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </div>

          <div className="flex basis-1/2 flex-col gap-4">
            <FormField
              control={form.control}
              name="invoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>INVOICE WORK ORDER</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isEditing}
                      className="border border-gray-300"
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
              name="dateOfEntry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-[2px] mt-2">TANGGAL MASUK</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={!isEditing}
                          // className={cn(
                          //   "border border-gray-300 pl-3",
                          //   !field.value && "text-muted-foreground",
                          // )}
                          className={cn(
                            "border border-gray-300 font-normal text-gray-900",
                            !field.value && "text-gray-400",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih Tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfExit"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-[2px] mt-2">
                    TANGGAL KELUAR
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={!isEditing}
                          // className={cn(
                          //   "border border-gray-300 pl-3",
                          //   !field.value && "text-muted-foreground",
                          // )}
                          className={cn(
                            "border border-gray-300 font-normal text-gray-900",
                            !field.value && "text-gray-400",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih Tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            {isEditing === false && (
              <div>
                <label className="text-sm font-medium">JENIS</label>
                <div className="mt-1 flex flex-wrap gap-2 rounded-md border border-gray-300 bg-gray-100 p-2">
                  <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-light uppercase text-white">
                    BASEBALL FULLPRINT
                  </span>
                  <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-light uppercase text-white">
                    KAOS
                  </span>
                  <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-light uppercase text-white">
                    LANYARD
                  </span>
                </div>
              </div>
            )}

            {isEditing === true && (
              <FormField
                control={form.control}
                name="jenis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JENIS</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        className="border border-gray-300"
                        placeholder="Masukkan jenis"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="mt-[2px] flex h-24 gap-1">
              <div className="group relative h-full basis-1/2 overflow-hidden rounded-sm border border-gray-900">
                <Image
                  alt="df"
                  className="h-full w-full object-cover"
                  src={imgBaju}
                />
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 hidden justify-between bg-gray-900",
                    isEditing && "group-hover:flex",
                  )}
                >
                  <a
                    href="#"
                    onClick={() => alert("download image")}
                    className="px-2 py-1 text-[.5rem] font-semibold uppercase text-white"
                  >
                    DOWNLOAD
                  </a>
                  <a
                    href="#"
                    onClick={() => alert("upload ulang image")}
                    className="px-2 py-1 text-[.5rem] font-semibold uppercase text-white"
                  >
                    UPLOAD ULANG
                  </a>
                </div>
              </div>
              <div className="group relative h-full basis-1/2 overflow-hidden rounded-sm bg-[#6DB6CC]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                  <IconCdr />
                </div>
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 hidden justify-between bg-white",
                    isEditing && "group-hover:flex",
                  )}
                >
                  <a
                    href="#"
                    onClick={() => alert("download cdr")}
                    className="px-2 py-1 text-[.5rem] font-semibold uppercase text-[#6DB6CC]"
                  >
                    DOWNLOAD
                  </a>
                  <a
                    href="#"
                    onClick={() => alert("upload ulang cdr")}
                    className="px-2 py-1 text-[.5rem] font-semibold uppercase text-[#6DB6CC]"
                  >
                    UPLOAD ULANG
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          {isEditing ? (
            <Button
              size={"modalTable"}
              variant={"default"}
              type="submit"
              className="bg-yellow-500 uppercase hover:bg-yellow-600"
            >
              Simpan
            </Button>
          ) : (
            <Button
              size={"modalTable"}
              variant={"default"}
              className="bg-gray-900 uppercase"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};
