import React, { useEffect, useState } from "react";
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
import Link from "next/link";

export const ProductionOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const editProductionData = useDialogProductionStore(
    useShallow((state: DialogProductionState) => state.editProductionData),
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
    setIsEditing,
  );

  function onSubmit(values: z.infer<typeof productionOverviewSchema>) {
    updateOverview(values);
  }
  const form = useForm<z.infer<typeof productionOverviewSchema>>({
    resolver: zodResolver(productionOverviewSchema),
    defaultValues: {
      name: "",
      invoice: "",
      password: "",
      phoneNumber: "",
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
      setValue("password", production?.password ?? "");
      setValue("phoneNumber", production?.phoneNumber);
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
          <div className="flex gap-5 px-5 pb-5">
            <div className="flex basis-1/2 flex-col gap-5">
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
                        {...field}
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
                        {...field}
                      />
                    </FormControl>
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
            <div className="flex basis-1/2 flex-col gap-5">
              <FormField
                control={form.control}
                name="invoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>INVOICE WORK ORDER</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PASSWORD</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="border border-gray-300 uppercase"
                        placeholder="-"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* JENIS */}
              {!isEditing && (
                <div>
                  <label className="text-sm font-medium">JENIS</label>
                  <div className="mt-1 flex flex-wrap gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2">
                    {typeValue.length > 0
                      ? typeValue?.split(",").map((item, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-gray-900 px-3 py-1 text-sm font-light uppercase text-white"
                          >
                            {item}
                          </span>
                        ))
                      : "-"}
                  </div>
                </div>
              )}
              {isEditing && (
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
                  <Image
                    alt="img.."
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
                      <Link
                        target="_blank"
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
                      </Link>
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
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 text-white">
                    <IconCdr width="24px" />
                    {production?.cdrUrl && (
                      <h5 className="text-xs">UPLOADED ✅</h5>
                    )}
                  </div>
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 hidden justify-between bg-white",
                      isEditing && "group-hover:flex",
                    )}
                  >
                    <div className="flex flex-1 items-end px-2 py-1">
                      <Link
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
                      </Link>
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
