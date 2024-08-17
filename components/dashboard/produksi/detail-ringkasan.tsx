import React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconAddFill from "@/public/icons/table/add-fill.svg";

const dummyRingkasanDataTemplate = (id: string) => {
  return {
    id: id,
    sablonBaju: "",
    sablonCelana: "",
    bahan: "",
    pola: "",
    warna: "",
    lengan: "",
    sizeS: "0",
    sizeM: "0",
    sizeL: "0",
    sizeXL: "0",
    sizeXXL: "0",
    size3XL: "0",
    size5XL: "0",
    size6XL: "0",
    size7XL: "0",
  };
};

export const DetailRingkasan = ({
  ringkasanData,
  setRingkasanData,
}: {
  ringkasanData: any[];
  setRingkasanData: any;
}) => {
  return (
    <div>
      <div className="flex justify-between font-medium">
        <h1>RINGKASAN</h1>
        <h1>TOTAL: {ringkasanData.length}</h1>
      </div>
      <div className="flex gap-2">
        <div className="mt-2 max-h-[13rem] grow overflow-y-scroll rounded-md border">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-sm text-white">NO</TableHead>
                <TableHead className="text-sm text-white">
                  SABLON BAJU
                </TableHead>
                <TableHead className="text-sm text-white">
                  SABLON CELANA
                </TableHead>
                <TableHead className="text-sm text-white">BAHAN</TableHead>
                <TableHead className="text-sm text-white">POLA</TableHead>
                <TableHead className="text-sm text-white">WARNA</TableHead>
                <TableHead className="text-sm text-white">LENGAN</TableHead>
                <TableHead className="text-sm text-white">S</TableHead>
                <TableHead className="text-sm text-white">M</TableHead>
                <TableHead className="text-sm text-white">L</TableHead>
                <TableHead className="text-sm text-white">XL</TableHead>
                <TableHead className="text-sm text-white">XXL</TableHead>
                <TableHead className="text-sm text-white">3XL</TableHead>
                <TableHead className="text-sm text-white">5XL</TableHead>
                <TableHead className="text-sm text-white">6XL</TableHead>
                <TableHead className="text-sm text-white">7XL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ringkasanData.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="text-sm">
                    <Input
                      className="rounded-none bg-transparent"
                      type="text"
                      value={data.sablonBaju}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        setRingkasanData((oldData: any[]) => {
                          const updatedData = oldData.map((curOldData: any) =>
                            curOldData.id === data.id
                              ? { ...curOldData, sablonBaju: inputValue }
                              : { ...curOldData },
                          );
                          return [...updatedData];
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-sm">
                    <Input
                      className="rounded-none bg-transparent"
                      type="text"
                      value={data.sablonCelana}
                    />
                  </TableCell>
                  <TableCell className="text-sm">{data.bahan}</TableCell>
                  <TableCell className="text-sm">{data.pola}</TableCell>
                  <TableCell className="text-sm">{data.warna}</TableCell>
                  <TableCell className="text-sm">{data.lengan}</TableCell>
                  <TableCell className="text-sm">{data.sizeS}</TableCell>
                  <TableCell className="text-sm">{data.sizeM}</TableCell>
                  <TableCell className="text-sm">{data.sizeL}</TableCell>
                  <TableCell className="text-sm">{data.sizeXL}</TableCell>
                  <TableCell className="text-sm">{data.sizeXXL}</TableCell>
                  <TableCell className="text-sm">{data.size3XL}</TableCell>
                  <TableCell className="text-sm">{data.size5XL}</TableCell>
                  <TableCell className="text-sm">{data.size6XL}</TableCell>
                  <TableCell className="text-sm">{data.size7XL}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-end">
          <button
            className="flex items-center justify-center rounded-sm bg-gray-900 px-1 py-4 text-white hover:bg-gray-700"
            onClick={() => {
              setRingkasanData((oldData: any[]) => [
                ...oldData,
                dummyRingkasanDataTemplate(
                  oldData[oldData.length - 1].id + "1",
                ),
              ]);
            }}
          >
            <IconAddFill className="inline h-4 w-4" viewBox="0 0 11 13" />
          </button>
        </div>
      </div>
    </div>
  );
};
