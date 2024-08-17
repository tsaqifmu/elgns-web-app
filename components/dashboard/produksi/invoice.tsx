import React from "react";
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

export const Invoice = () => {
  const dummyInvoiceData = [
    {
      id: "1",
      jenis: "NORMAL",
      jumlah: "130",
      harga: "Rp 150,000",
      total: "Rp 19,500,000",
    },
    {
      id: "2",
      jenis: "UPSIZE NORMAL",
      jumlah: "3",
      harga: "Rp 10,000",
      total: "Rp 30,000",
    },
    {
      id: "3",
      jenis: "UPSIZE OVER",
      jumlah: "4",
      harga: "Rp 20,000",
      total: "Rp 80,000",
    },
    {
      id: "4",
      jenis: "UPSIZE OVER",
      jumlah: "4",
      harga: "Rp 20,000",
      total: "Rp 80,000",
    },
    {
      id: "5",
      jenis: "UPSIZE OVER",
      jumlah: "4",
      harga: "Rp 20,000",
      total: "Rp 80,000",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-5">
        <div className="flex">
          <div className="flex basis-1/2 flex-col gap-2">
            <h1>
              <span className="font-medium text-gray-500">CUSTOMER:</span>
              <span className="ms-2 font-light text-gray-500">
                {"INGS (SEKARIBA)"}
              </span>
            </h1>
            <h1>
              <span className="font-medium text-gray-500">NOMOR WA:</span>
              <span className="ms-2 font-light text-gray-500">
                {"6285155348643"}
              </span>
            </h1>
            <h1>
              <span className="font-medium text-gray-500">JENIS:</span>
              <span className="ms-2 font-light text-gray-500">
                {"BASEBALL FULLPRINT, KAOS, LANYARD"}
              </span>
            </h1>
          </div>
          <div className="flex basis-1/2 flex-col gap-2">
            <h1>
              <span className="font-medium text-gray-500">NO INVOICE:</span>
              <span className="ms-2 font-light text-gray-500">
                {"WO.01.20 FEB-SEKARIMBA-MAKLON"}
              </span>
            </h1>
            <h1>
              <span className="font-medium text-gray-500">TANGGAL MASUK:</span>
              <span className="ms-2 font-light text-gray-500">
                {"20 FEB 2024"}
              </span>
            </h1>
            <h1>
              <span className="font-medium text-gray-500">TANGGAL KELUAR:</span>
              <span className="ms-2 font-light text-gray-500">
                {"27 FEB 2024"}
              </span>
            </h1>
          </div>
        </div>
        <div className="max-h-52 overflow-x-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-sm text-white">NO</TableHead>
                <TableHead className="text-sm text-white">JENIS</TableHead>
                <TableHead className="text-sm text-white">JUMLAH</TableHead>
                <TableHead className="w-40 text-sm text-white">HARGA</TableHead>
                <TableHead className="w-40 text-sm text-white">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyInvoiceData.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="text-sm">{data.jenis}</TableCell>
                  <TableCell className="text-sm">{data.jumlah}</TableCell>
                  <TableCell className="text-sm">{data.harga}</TableCell>
                  <TableCell className="text-sm">{data.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead className="w-40 text-sm text-white">
                    TOTAL
                  </TableHead>
                  <TableHead className="w-40 text-sm text-white">
                    {"Rp 19,610,000"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-sm">DEPOSIT AWAL</TableCell>
                  <TableCell className="text-sm">{"-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">UANG MUKA</TableCell>
                  <TableCell className="text-sm">{"Rp 9,750,000"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">POTONGAN</TableCell>
                  <TableCell className="text-sm">{"-"}</TableCell>
                </TableRow>
                <TableRow className="bg-gray-900 text-white hover:bg-gray-900">
                  <TableCell className="text-sm">TOTAL</TableCell>
                  <TableCell className="text-sm">{"Rp 9,860,000"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DialogFooter className="flex gap-1">
        <Button
          size={"modalTable"}
          variant={"outline"}
          className="flex items-center gap-2 border-gray-900 px-2 py-1 text-base font-medium uppercase"
        >
          <IconDownloadPdf /> DOWNLOAD PDF
        </Button>
        <Button
          size={"modalTable"}
          variant={"default"}
          type="submit"
          className="bg-gray-900 text-base uppercase"
        >
          EDIT
        </Button>
      </DialogFooter>
    </div>
  );
};
