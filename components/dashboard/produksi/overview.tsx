import { FC, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { productionOverviewSchema } from "@/schemas/produksiOverviewSchema";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Production } from "@/hooks/useFetchProductions";
import { add7DaysToDate, formatToIndonesianDate } from "@/lib/dateUtils";

interface OverviewProps {
  production: Production;
  setIsOpen: any;
}

export const Overview: FC<OverviewProps> = ({ production, setIsOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDatePopOverOpen, setIsDatePopOverOpen] = useState(false);
  const form = useForm<z.infer<typeof productionOverviewSchema>>({
    resolver: zodResolver(productionOverviewSchema),
    defaultValues: {
      name: production.name,
      invoice: production.invoice,
      phoneNumber: production.phoneNumber,
      address: production.address,
      dateOfEntry: new Date(production.dateOfEntry),
      dateOfExit: new Date(production.dateOfExit),
      notes: production.notes,
      imageFile: undefined,
      type: "birds, of, a , feather",
    },
  });
  const dateOfEntryWatch = form.watch("dateOfEntry");

  function onSubmit(values: z.infer<typeof productionOverviewSchema>) {
    console.log("submitted val: ", values);
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-8 px-5 pb-5">
          <div className="flex basis-1/2 flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NAMA CUSTOMER</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      className="border border-gray-300 uppercase"
                      placeholder="Masukkan nama customer"
                      value={field.value}
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
                      disabled={true}
                      className="border border-gray-300"
                      placeholder="62851XXXX"
                      type="tel"
                      value={field.value}
                    />
                  </FormControl>
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
                    <Textarea
                      disabled={true}
                      className="border border-gray-300"
                      placeholder="Masukkan alamat anda"
                      value={field.value}
                      rows={4}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CATATAN</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={true}
                      className="border border-gray-300"
                      placeholder="Masukkan catatan"
                      value={field.value}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="border border-gray-300 uppercase"
                      placeholder="Masukkan invoice"
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
                  <Popover
                    open={isDatePopOverOpen}
                    onOpenChange={setIsDatePopOverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={!isEditing}
                          className={cn(
                            "border border-gray-300 font-normal uppercase text-gray-900",
                            !field.value && "text-gray-400",
                          )}
                        >
                          {field.value ? (
                            formatToIndonesianDate(field.value.toISOString())
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
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setIsDatePopOverOpen(false);
                        }}
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
                          disabled
                          className={cn(
                            "border border-gray-300 font-normal uppercase text-gray-900",
                          )}
                        >
                          {add7DaysToDate(dateOfEntryWatch.toISOString())}
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
                  {form
                    .getValues("type")
                    .split(",")
                    .map((item, index) => (
                      <span
                        key={index}
                        className="min-h-6 rounded-md bg-gray-900 px-3 py-1 text-sm font-light uppercase text-white"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            )}
            {isEditing === true && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JENIS</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        className="border border-gray-300 uppercase"
                        placeholder="Masukkan jenis"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* INPUT FILES */}
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
                  <div className="flex flex-1 items-end px-2 py-1">
                    <a
                      href="#"
                      onClick={() => alert("download image")}
                      className="text-[.5rem] font-semibold text-white"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                  <div className="flex flex-1 items-end justify-end px-2 py-1">
                    <FormField
                      control={form.control}
                      name="imageFile"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex">
                              <Input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    field.onChange(file);
                                  }
                                }}
                                className="absolute inset-0 cursor-pointer opacity-0"
                              />
                              <button
                                type="button"
                                className="p-0 text-[.5rem] font-semibold uppercase text-white hover:bg-transparent hover:text-white"
                              >
                                UPLOAD ULANG
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* INPUT CDR FILE */}
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
              type="button"
              size={"modalTable"}
              variant={"default"}
              className="bg-gray-900 uppercase"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};
