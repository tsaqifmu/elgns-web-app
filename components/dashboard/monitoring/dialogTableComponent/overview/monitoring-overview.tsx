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
import { monitoringOverviewSchema } from "@/schemas/monitoringOverviewSchema";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import ButtonPending from "@/components/button-pending";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import {
  DialogMonitoringAction,
  DialogMonitoringState,
  useDialogMonitoringStore,
} from "@/stores/dialog-monitoring-store";
import { useFetchMonitoringOverview } from "@/hooks/monitoring/useFetchMonitoringOverview";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { add11DaysToDate, formatToIndonesianDate } from "@/lib/dateUtils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import AddFill from "@/public/icons/table/add-fill.svg";
import { useUpdateMonitoringOverview } from "@/hooks/monitoring/useUpdateMonitoringOverview";
import Link from "next/link";

export const MonitoringOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [previewImageProofingUrl, setPreviewImageProofingUrl] = useState<
    string | null
  >(null);
  const [cardMonitoringId, editMonitoringData, column] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.cardMonitoringId,
        state.editMonitoringData,
        state.column,
      ]),
    );
  const productionId = editMonitoringData?._id;
  const {
    data: production,
    isLoading,
    isError,
    error,
  } = useFetchMonitoringOverview(productionId);

  const { mutate: updateOverview, isPending } = useUpdateMonitoringOverview(
    production?.id,
    cardMonitoringId,
    column,
    setIsEditing,
  );

  function onSubmit(values: z.infer<typeof monitoringOverviewSchema>) {
    updateOverview(values);
  }

  const form = useForm<z.infer<typeof monitoringOverviewSchema>>({
    resolver: zodResolver(monitoringOverviewSchema),
    defaultValues: {
      name: "",
      invoice: "",
      password: "",
      phoneNumber: "",
      notes: "",
      type: "",
      dateIn: undefined,
      dateOut: undefined,
      imageFile: null,
      cdrFile: null,
      proofFile: null,
      pdfFile: null,
    },
  });

  const { setValue } = form;
  const [isDatePopOverOpen, setIsDatePopOverOpen] = useState(false);
  const dateInWatch = form.watch("dateIn");

  useEffect(
    () =>
      form.setValue(
        "dateOut",
        new Date(add11DaysToDate(dateInWatch?.toISOString())),
      ),
    [dateInWatch, form],
  );

  useEffect(() => {
    if (production) {
      setValue("name", production?.customerName ?? "");
      setValue("invoice", production?.invoiceNumber ?? "");
      setValue("phoneNumber", production?.phoneNumber);
      setValue("password", production?.password ?? "");
      setValue("notes", production?.notes ?? "");
      setValue("type", production?.type ?? "");
      if (production?.dateIn) {
        setValue("dateIn", new Date(production.dateIn));
      }
      if (production.dateOut) {
        setValue("dateOut", new Date(production.dateOut));
      } else {
        setValue("dateOut", null);
      }
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
                name="invoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>INVOICE WORK ORDER</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="border border-gray-300"
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
                        className="border border-gray-300"
                        placeholder="-"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TANGGAL MASUK & KELUAR */}
              <FormField
                control={form.control}
                name="dateIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-[2px] mt-2">
                      TANGGAL MASUK
                    </FormLabel>

                    {!isEditing && (
                      <Button
                        variant={"outline"}
                        type="button"
                        className={cn(
                          "border border-gray-300 font-normal uppercase text-gray-900",
                        )}
                      >
                        {formatToIndonesianDate(
                          form.getValues("dateIn")?.toISOString(),
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    )}

                    {isEditing && (
                      <Popover
                        open={isDatePopOverOpen}
                        onOpenChange={setIsDatePopOverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "border border-gray-300 font-normal uppercase text-gray-900",
                                !field.value && "text-gray-400",
                              )}
                            >
                              {field.value &&
                                formatToIndonesianDate(
                                  field.value.toISOString(),
                                )}
                              {!field.value && <span>Pilih Tanggal</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={(e) => {
                              field.onChange(e);
                              setIsDatePopOverOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-[2px] mt-2">
                      TANGGAL KELUAR
                    </FormLabel>
                    <Button
                      variant={"outline"}
                      type="button"
                      className={cn(
                        "border border-gray-300 font-normal uppercase",
                        dateInWatch ? "text-gray-900" : "text-gray-500",
                      )}
                    >
                      {!dateInWatch && "-"}
                      {dateInWatch &&
                        formatToIndonesianDate(
                          add11DaysToDate(dateInWatch.toISOString()),
                        )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>

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
                        readOnly
                        className="border border-gray-300"
                        placeholder="-"
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
              {/* LAMPIRAN */}
              <div>
                <h1 className="mt-1 text-sm font-medium">LAMPIRAN</h1>
                {/* LAMPIRAN IMAGE & CDR */}
                <div className="mt-2 flex h-24 gap-1">
                  {/* INPUT IMAGE */}
                  <div className="group relative h-full basis-1/2 overflow-hidden rounded-sm border border-gray-900">
                    <Image
                      alt="img.."
                      className="h-full w-full object-cover"
                      width={1000}
                      height={500}
                      src={
                        previewImageUrl !== null
                          ? previewImageUrl
                          : production?.imgUrl !== undefined
                            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                                production?.imgUrl
                              }`
                            : imgBaju
                      }
                    />
                    {/* IMAGE DOWNLOAD & UPLOAD ULANG */}
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
                                      setPreviewImageUrl(previewUrl);
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
                {/* LAMPIRAN PDF */}
                {column?.name.toUpperCase() === "MAL" && (
                  <FormField
                    control={form.control}
                    name="pdfFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="mt-4 flex max-w-[21rem] items-center justify-between gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-[10px]">
                            <div className="pdf-file-name w-1/2 overflow-hidden text-ellipsis text-sm">
                              {pdfFileName
                                ? pdfFileName
                                : production?.pdfUrl
                                  ? "PDF TERSEDIA ✅"
                                  : "PDF KOSONG"}
                            </div>
                            <div className="pdf-buttons flex w-1/2 justify-end gap-2 text-xs">
                              {production?.pdfUrl && (
                                <div className="pdf-download font-semibold">
                                  <a
                                    className="hover:underline"
                                    target="_blank"
                                    href={
                                      production?.pdfUrl
                                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${
                                            production?.pdfUrl
                                          }`
                                        : "#"
                                    }
                                    download={true}
                                  >
                                    DOWNLOAD
                                  </a>
                                </div>
                              )}
                              {isEditing && (
                                <div className="pdf-upload group relative overflow-hidden font-semibold">
                                  <Input
                                    type="file"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    accept=".pdf"
                                    onChange={(e) => {
                                      if (!e.target.files) return;
                                      const file = e.target.files[0];
                                      field.onChange(file);
                                      setPdfFileName(
                                        e.target.files?.[0]?.name ||
                                          "No file selected",
                                      );
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="group-hover:underline"
                                  >
                                    UPLOAD
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="proofFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BUKTI PEKERJAAN</FormLabel>
                      <FormControl>
                        <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border border-gray-400 bg-gray-200">
                          {!previewImageProofingUrl && (
                            <AddFill
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
                              width="24px"
                            />
                          )}
                          {previewImageProofingUrl && (
                            <Image
                              className="absolute inset-0 h-full object-cover"
                              width={600}
                              height={400}
                              alt=""
                              src={previewImageProofingUrl}
                            />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            className={cn(
                              "absolute inset-0 box-border h-full cursor-pointer opacity-0",
                              !isEditing && "hidden",
                            )}
                            onChange={(e) => {
                              if (!e.target.files) return;
                              const file = e.target.files[0];
                              field.onChange(file);
                              const previewUrl = URL.createObjectURL(file);
                              setPreviewImageProofingUrl(previewUrl);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
