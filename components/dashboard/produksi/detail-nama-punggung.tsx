import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconAddFill from "@/public/icons/table/add-fill.svg";

export const DetailNamaPunggung = ({
  namaPunggungData,
  setNamaPunggungData,
}: {
  namaPunggungData: any[];
  setNamaPunggungData: any;
}) => {
  return (
    <div>
      <h1 className="font-medium">NAMA PUNGGUNG</h1>
      <div className="flex gap-2">
        <div className="mt-2 max-h-[13rem] grow overflow-y-scroll rounded-md border">
          <Table>
            <TableHeader className="bg-[#6DB6CC]">
              <TableRow>
                <TableHead className="text-sm text-white">NO</TableHead>
                <TableHead className="text-sm text-white">
                  NAMA PUNGGUNG
                </TableHead>
                <TableHead className="text-sm text-white">NOMOR</TableHead>
                <TableHead className="text-sm text-white">SIZE</TableHead>
                <TableHead className="text-sm text-white">KETERANGAN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {namaPunggungData.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell className="text-sm uppercase">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-sm uppercase">
                    {data.namaPunggung}
                  </TableCell>
                  <TableCell className="text-sm">{data.nomor}</TableCell>
                  <TableCell className="text-sm uppercase">
                    {data.size}
                  </TableCell>
                  <TableCell className="text-sm uppercase">
                    {data.keterangan}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-end">
          <button
            className="flex items-center justify-center rounded-sm bg-[#6DB6CC] px-1 py-4 text-white hover:bg-[#8bc3d3]"
            onClick={() => {
              setNamaPunggungData((oldData) => [...oldData, oldData[0]]);
            }}
          >
            <IconAddFill className="inline h-4 w-4" viewBox="0 0 11 13" />
          </button>
        </div>
      </div>
    </div>
  );
};
