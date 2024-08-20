import React, { ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconAddFill from "@/public/icons/table/add-fill.svg";
import { Input } from "@/components/ui/input";

export interface NamaPunggungData {
  id: string;
  namaPunggung: string;
  nomor: number;
  size: string;
  keterangan: string;
}

const getDummyNamaPunggungData = (id: string) => {
  return {
    id: id,
    namaPunggung: "",
    nomor: 0,
    size: "",
    keterangan: "",
  } as NamaPunggungData;
};

export const DetailNamaPunggung = ({
  namaPunggungData,
  setNamaPunggungData,
}: {
  namaPunggungData: NamaPunggungData[];
  setNamaPunggungData: any;
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    data: NamaPunggungData,
  ) => {
    const { name, value } = e.target;

    setNamaPunggungData((prevData: NamaPunggungData[]) => {
      const updatedData = prevData.map((item: NamaPunggungData) =>
        item.id === data.id ? { ...item, [name]: value } : { ...item },
      );
      return [...updatedData];
    });
  };

  return (
    <div>
      <h1 className="font-medium">NAMA PUNGGUNG</h1>
      <div className="flex gap-2">
        <div className="mt-2 max-h-[13rem] grow overflow-y-scroll rounded-md border border-[#6DB6CC]">
          <Table>
            <TableHeader className="bg-[#6DB6CC]">
              <TableRow>
                <TableHead className="w-14 text-sm text-white">NO</TableHead>
                <TableHead className="w-48 text-sm text-white">
                  NAMA PUNGGUNG
                </TableHead>
                <TableHead className="w-24 text-sm text-white">NOMOR</TableHead>
                <TableHead className="w-24 text-sm text-white">SIZE</TableHead>
                <TableHead className="text-sm text-white">KETERANGAN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {namaPunggungData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm uppercase">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="namaPunggung"
                      value={item.namaPunggung}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="number"
                      name="nomor"
                      value={item.nomor}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="size"
                      value={item.size}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="keterangan"
                      value={item.keterangan}
                      onChange={(e) => handleChange(e, item)}
                    />
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
              setNamaPunggungData((prevData: NamaPunggungData[]) => [
                ...prevData,
                getDummyNamaPunggungData(
                  prevData[prevData.length - 1].id + "1",
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
