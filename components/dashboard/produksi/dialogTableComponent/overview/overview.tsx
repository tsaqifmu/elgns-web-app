import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
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
import imgBaju from "@/public/images/dialog-image.png";
import IconCdr from "@/public/icons/table/cdr.svg";
import { productionOverviewSchema } from "@/schemas/productionOverviewSchema";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import Image from "next/image";
import { useUpdateProductionOverview } from "@/hooks/production/useUpdateProductionOverview";
import ButtonPending from "@/components/button-pending";
import { useFetchProductionOverview } from "@/hooks/production/useFetchProductionOverview";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";

export const Overview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editProductionData, closeEditProductionDialog] =
    useDialogProductionStore(
      useShallow((state: DialogProductionState & DialogProductionAction) => [
        state.editProductionData,
        state.closeEditProductionDialog,
      ]),
    );
  const productionId = editProductionData?.id;
  const {
    data: production,
    isLoading,
    isError,
    error,
  } = useFetchProductionOverview(productionId);
  const { mutate: updateOverview, isPending } = useUpdateProductionOverview(
    production?.id,
    closeEditProductionDialog,
  );

  function onSubmit(values: z.infer<typeof productionOverviewSchema>) {
    console.log("submitted val: ", values);
    updateOverview(values);
  }
  const form = useForm<z.infer<typeof productionOverviewSchema>>({
    resolver: zodResolver(productionOverviewSchema),
    defaultValues: {
      name: "",
      invoice: "",
      phoneNumber: "",
      address: "",
      notes: "",
      type: "",
      imageFile: null,
      cdrFile: null,
    },
  });
  const { setValue, watch } = form;
  const typeValue = watch("type", "");
  useEffect(() => {
    if (production) {
      setValue("name", production?.customerName ?? "");
      setValue("invoice", production?.invoiceNumber ?? "");
      setValue("phoneNumber", production?.phoneNumber);
      setValue("address", production?.address ?? "");
      setValue("notes", production?.notes ?? "");
      setValue("type", production?.type ?? "");
    }
  }, [production, setValue]);

  if (isLoading) {
    return (
      <div className="p-4">
        <SkeletonTable />
      </div>
    );
  }

  if (isError) {
    return <ErrorLoadData error={error} />;
  }

  if (production)
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly={!isEditing}
                        className="border border-gray-300"
                        placeholder={!isEditing ? "-" : "Masukkan catatan"}
                        rows={4}
                        {...field}
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
                        readOnly={!isEditing}
                        className="border border-gray-300 uppercase"
                        placeholder="Masukkan invoice"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* JENIS */}
              {isEditing === false && (
                <div>
                  <label className="text-sm font-medium">JENIS</label>
                  <div className="mt-1 flex flex-wrap gap-2 rounded-md border border-gray-300 bg-gray-100 p-2">
                    {typeValue?.split(",").map((item, index) => (
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
                {/* INPUT IMAGE */}
                <div className="group relative h-full basis-1/2 overflow-hidden rounded-sm border border-gray-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    alt="halo"
                    className="h-full w-full object-cover"
                    width={1000}
                    height={500}
                    src={
                      previewImage !== null
                        ? previewImage
                        : production?.imgUrl !== undefined
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                              production?.imgUrl
                            }`
                          : imgBaju
                    }
                  />
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 hidden justify-between bg-gray-900",
                      isEditing && "group-hover:flex",
                    )}
                  >
                    <div className="flex flex-1 items-end px-2 py-1">
                      <a
                        href={
                          production?.imgUrl
                            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                                production?.imgUrl
                              }`
                            : "#"
                        }
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
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    const file = e.target.files[0];
                                    field.onChange(file);
                                    const previewUrl =
                                      URL.createObjectURL(file);
                                    setPreviewImage(previewUrl);
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
                {/* INPUT CDR */}
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
                    <div className="flex flex-1 items-end px-2 py-1">
                      <a
                        href={
                          production?.cdrUrl
                            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                                production?.cdrUrl
                              }`
                            : "#"
                        }
                        className="text-[.5rem] font-semibold text-[#6DB6CC]"
                      >
                        DOWNLOAD
                      </a>
                    </div>
                    <div className="flex flex-1 items-end justify-end px-2 py-1">
                      <FormField
                        control={form.control}
                        name="cdrFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative flex">
                                <Input
                                  type="file"
                                  accept=".cdr"
                                  onChange={(e) =>
                                    field.onChange(e.target.files?.[0])
                                  }
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                />
                                <button
                                  type="button"
                                  className="p-0 text-[.5rem] font-semibold uppercase text-[#6DB6CC] hover:bg-transparent hover:text-white"
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
              </div>
            </div>
          </div>

          <DialogFooter>
            {isEditing ? (
              <ButtonPending
                isPending={isPending}
                variant={"yellow"}
                size={"modalTable"}
                title="SIMPAN"
              />
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

// const [isDatePopOverOpen, setIsDatePopOverOpen] = useState(false);
// const dateOfEntryWatch = form.watch("dateOfEntry");
// {
//   /* <FormField
//               control={form.control}
//               name="dateOfEntry"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="mb-[2px] mt-2">TANGGAL MASUK</FormLabel>
//                   <Popover
//                     open={isDatePopOverOpen}
//                     onOpenChange={setIsDatePopOverOpen}
//                   >
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           disabled={!isEditing}
//                           className={cn(
//                             "border border-gray-300 font-normal uppercase text-gray-900",
//                             !field.value && "text-gray-400",
//                           )}
//                         >
//                           {field.value ? (
//                             formatToIndonesianDate(field.value.toISOString())
//                           ) : (
//                             <span>Pilih Tanggal</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={(e) => {
//                           field.onChange(e);
//                           setIsDatePopOverOpen(false);
//                         }}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="dateOfExit"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="mb-[2px] mt-2">
//                     TANGGAL KELUAR
//                   </FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           disabled
//                           className={cn(
//                             "border border-gray-300 font-normal uppercase text-gray-900",
//                           )}
//                         >
//                           {add7DaysToDate(dateOfEntryWatch.toISOString())}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         // selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */
// }
