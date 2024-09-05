/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import IconDownloadPdf from "@/public/icons/table/download-pdf.svg";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import { useFetchProductionInvoice } from "@/hooks/production/useFetchProductionInvoice";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import { Input } from "@/components/ui/input";
import { useUpdateProductionInvoice } from "@/hooks/production/useUpdateProductionInvoice";
import ButtonPending from "@/components/button-pending";
import {
  formatNumberToRupiah,
  formatRupiahToNumber,
} from "@/lib/currencyUtils";
import { InvoiceTableTotal } from "@/types/production/invoice/invoice-table-total";
import { InvoiceTableItem } from "@/types/production/invoice/invoice-table-item";
import { useShallow } from "zustand/react/shallow";
import { formatToIndonesianDate } from "@/lib/dateUtils";

export const ProductionInvoice = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tableInvoice, setTableInvoice] = useState<InvoiceTableItem[]>([]);
  const [tableTotal, setTableTotal] = useState<InvoiceTableTotal>({
    totalPrice: 0,
    initialDeposit: 0,
    downPayment: 0,
    discount: 0,
    totalFinal: 0,
  });

  const [production, closeEditProductionDialog] = useDialogProductionStore(
    useShallow((state: DialogProductionState & DialogProductionAction) => [
      state.editProductionData,
      state.closeEditProductionDialog,
    ]),
  );

  const fetchQuery = useFetchProductionInvoice(production?.id);
  const { data: invoice, isLoading, isError, error } = fetchQuery;

  const { mutate: updateInvoice, isPending } = useUpdateProductionInvoice(
    production?.id,
    closeEditProductionDialog,
  );

  // SET INVOICE AND TOTAL STATE AFTER FETCHING
  useEffect(() => {
    if (!invoice) return;

    setTableInvoice(invoice.invoices);
    setTableTotal(invoice.total);
  }, [invoice]);

  // CALCULATE TOTAL PRICE AFTER ANY CHANGES IN INVOICE
  useEffect(() => {
    let totalPrice = 0;
    tableInvoice.forEach((item) => (totalPrice += item.total));
    setTableTotal({ ...tableTotal, totalPrice } as InvoiceTableTotal);
  }, [tableInvoice]);

  // CALCULATE TOTAL FINAL PRICE AFTER ANY CHANGES IN TABLE TOTAL
  useEffect(() => {
    setTableTotal({
      ...tableTotal,
      totalFinal:
        tableTotal.totalPrice -
        tableTotal.discount -
        tableTotal.downPayment -
        tableTotal.initialDeposit,
    });
  }, [
    tableTotal.discount,
    tableTotal.downPayment,
    tableTotal.initialDeposit,
    tableTotal.totalPrice,
  ]);

  const handleInvoiceChange = (
    e: ChangeEvent<HTMLInputElement>,
    invoice: InvoiceTableItem,
  ) => {
    const { name, value } = e.target;
    let valueInNumber = 0;
    let totalPrice = 0;
    let prevData = tableInvoice.find((inv) => inv.id === invoice.id);

    if (name === "quantity") {
      valueInNumber = parseInt(value);
      if (Number.isNaN(valueInNumber)) valueInNumber = 0;
      totalPrice = valueInNumber * prevData!.price;
    } else {
      valueInNumber = formatRupiahToNumber(value);
      if (Number.isNaN(valueInNumber)) valueInNumber = 0;
      totalPrice = valueInNumber * prevData!.quantity;
    }

    setTableInvoice((prevInvoices: InvoiceTableItem[]) =>
      prevInvoices.map((prevInvoice: InvoiceTableItem) =>
        prevInvoice.id === invoice.id
          ? {
              ...prevInvoice,
              [name]: valueInNumber,
              total: totalPrice,
            }
          : { ...prevInvoice },
      ),
    );
  };

  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let valueInNumber = formatRupiahToNumber(value);
    if (Number.isNaN(valueInNumber)) valueInNumber = 0;

    setTableTotal({
      ...tableTotal,
      [name]: valueInNumber,
    } as InvoiceTableTotal);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    updateInvoice({
      invoiceNumber: "",
      name: "",
      phoneNumber: "",
      type: "",
      dateOfEntry: "",
      dateOfExit: "",
      invoices: tableInvoice,
      total: tableTotal,
    });
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="p-4">
          <SkeletonTable />
        </div>
      );
    if (isError) return <ErrorLoadData error={error} />;
    if (invoice) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-5 pb-5">
            {/* HEADER */}
            <div className="flex">
              <div className="flex basis-1/2 flex-col gap-2">
                <h1>
                  <span className="font-medium text-gray-500">CUSTOMER:</span>
                  <span className="ms-2 font-light uppercase text-gray-500">
                    {invoice.name}
                  </span>
                </h1>
                <h1>
                  <span className="font-medium text-gray-500">NOMOR WA:</span>
                  <span className="ms-2 font-light text-gray-500">
                    {invoice.phoneNumber}
                  </span>
                </h1>
                <h1>
                  <span className="font-medium text-gray-500">JENIS:</span>
                  <span className="ms-2 font-light uppercase text-gray-500">
                    {invoice.type}
                  </span>
                </h1>
              </div>
              <div className="flex basis-1/2 flex-col gap-2">
                <h1>
                  <span className="font-medium text-gray-500">NO INVOICE:</span>
                  <span className="ms-2 font-light uppercase text-gray-500">
                    {invoice.invoiceNumber}
                  </span>
                </h1>
                <h1>
                  <span className="font-medium text-gray-500">
                    TANGGAL MASUK:
                  </span>
                  <span className="ms-2 font-light uppercase text-gray-500">
                    {formatToIndonesianDate(invoice.dateOfEntry)}
                  </span>
                </h1>
                <h1>
                  <span className="font-medium text-gray-500">
                    TANGGAL KELUAR:
                  </span>
                  <span className="ms-2 font-light uppercase text-gray-500">
                    {formatToIndonesianDate(invoice.dateOfExit)}
                  </span>
                </h1>
              </div>
            </div>
            {/* TABLE INVOICE */}
            <div className="max-h-52 overflow-x-hidden rounded-md border border-gray-900">
              <Table>
                <TableHeader className="bg-gray-900">
                  <TableRow>
                    <TableHead className="text-sm text-white">NO</TableHead>
                    <TableHead className="text-sm text-white">JENIS</TableHead>
                    <TableHead className="text-sm text-white">JUMLAH</TableHead>
                    <TableHead className="w-40 text-sm text-white">
                      HARGA
                    </TableHead>
                    <TableHead className="w-40 text-sm text-white">
                      TOTAL
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableInvoice.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm">{index + 1}</TableCell>
                      <TableCell className="text-sm uppercase">
                        {item.type}
                      </TableCell>
                      <TableCell className="text-sm">
                        {isEditing && (
                          <Input
                            className="rounded-none bg-transparent p-1 uppercase"
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleInvoiceChange(e, item)}
                          />
                        )}
                        {!isEditing && item.quantity}
                      </TableCell>
                      <TableCell className="text-sm">
                        {isEditing && (
                          <Input
                            className="rounded-none bg-transparent p-1"
                            type="text"
                            name="price"
                            value={formatNumberToRupiah(item.price)}
                            onChange={(e) => handleInvoiceChange(e, item)}
                          />
                        )}
                        {!isEditing && formatNumberToRupiah(item.price)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatNumberToRupiah(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* TABLE TOTAL */}
            <div className="flex justify-end">
              <div className="overflow-hidden rounded-md border border-gray-900">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow>
                      <TableHead className="w-40 text-sm text-white">
                        TOTAL
                      </TableHead>
                      <TableHead className="w-40 ps-3 text-sm text-white">
                        {formatNumberToRupiah(tableTotal?.totalPrice ?? 0)}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-sm">DEPOSIT AWAL</TableCell>
                      <TableCell className="text-sm">
                        {isEditing && (
                          <Input
                            className="rounded-none bg-transparent p-1"
                            type="text"
                            name="initialDeposit"
                            value={formatNumberToRupiah(
                              tableTotal?.initialDeposit ?? 0,
                            )}
                            onChange={(e) => handleTotalChange(e)}
                          />
                        )}
                        {!isEditing &&
                          formatNumberToRupiah(tableTotal?.initialDeposit ?? 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm">UANG MUKA</TableCell>
                      <TableCell className="text-sm">
                        {isEditing && (
                          <Input
                            className="rounded-none bg-transparent p-1"
                            type="text"
                            name="downPayment"
                            value={formatNumberToRupiah(
                              tableTotal?.downPayment ?? 0,
                            )}
                            onChange={(e) => handleTotalChange(e)}
                          />
                        )}
                        {!isEditing &&
                          formatNumberToRupiah(tableTotal?.downPayment ?? 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm">POTONGAN</TableCell>
                      <TableCell className="text-sm">
                        {isEditing && (
                          <Input
                            className="rounded-none bg-transparent p-1"
                            type="text"
                            name="discount"
                            value={formatNumberToRupiah(
                              tableTotal?.discount ?? 0,
                            )}
                            onChange={(e) => handleTotalChange(e)}
                          />
                        )}
                        {!isEditing &&
                          formatNumberToRupiah(tableTotal?.discount ?? 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-900 text-white hover:bg-gray-900">
                      <TableCell className="text-sm">TOTAL</TableCell>
                      <TableCell className="text-sm">
                        {formatNumberToRupiah(tableTotal?.totalFinal ?? 0)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          {/* FOOTER */}
          <DialogFooter className="flex gap-1">
            <Button
              size={"modalTable"}
              variant={"outline"}
              className="flex items-center gap-2 border-gray-900 px-2 py-1 text-base font-medium"
            >
              <IconDownloadPdf /> DOWNLOAD PDF
            </Button>
            {!isEditing && (
              <Button
                size={"modalTable"}
                variant={"default"}
                type="button"
                className="bg-gray-900 text-base uppercase"
                onClick={() => setIsEditing(true)}
              >
                EDIT
              </Button>
            )}

            {isEditing && (
              <ButtonPending
                size={"modalTable"}
                variant={"default"}
                className="bg-yellow-500 text-base uppercase hover:bg-yellow-600"
                title="SIMPAN"
                isPending={isPending}
              />
            )}
          </DialogFooter>
        </form>
      );
    }
  };

  return renderContent();
};
