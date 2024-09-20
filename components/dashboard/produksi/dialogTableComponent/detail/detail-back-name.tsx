import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
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
import {
  BackName,
  getEmptyBackNameData,
} from "@/types/production/detail/back-name";
import { cn } from "@/lib/utils";

interface DetailBackNameProps {
  backNames: BackName[];
  setBackNames: Dispatch<SetStateAction<BackName[]>>;
  isReadOnly?: boolean;
}

export const DetailBackName = ({
  backNames,
  setBackNames,
  isReadOnly = false,
}: DetailBackNameProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    changedBackName: BackName,
  ) => {
    const { name, value } = e.target;

    setBackNames((prevBackNames: BackName[]) => {
      const updatedData = prevBackNames.map((prevBackName: BackName) =>
        prevBackName.id === changedBackName.id
          ? { ...prevBackName, [name]: value }
          : { ...prevBackName },
      );
      return [...updatedData];
    });
  };

  return (
    <div>
      <h1 className="font-medium">NAMA PUNGGUNG</h1>
      <div className="flex gap-2">
        <div className="mt-2 max-h-[10rem] grow overflow-y-scroll rounded-md border border-[#6DB6CC]">
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
              {backNames.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm uppercase">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1 uppercase",
                        isReadOnly && "border-none",
                      )}
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1 uppercase",
                        isReadOnly && "border-none",
                      )}
                      type="number"
                      name="number"
                      value={item.number}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1 uppercase",
                        isReadOnly && "border-none",
                      )}
                      type="text"
                      name="size"
                      value={item.size}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm uppercase">
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1 uppercase",
                        isReadOnly && "border-none",
                      )}
                      type="text"
                      name="notes"
                      value={item.notes}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {!isReadOnly && (
          <div className="flex items-end">
            <button
              className="flex items-center justify-center rounded-sm bg-[#6DB6CC] px-1 py-4 text-white hover:bg-[#8bc3d3]"
              onClick={() => {
                setBackNames((prevBackNames: BackName[]) => [
                  ...prevBackNames,
                  getEmptyBackNameData(),
                ]);
              }}
            >
              <IconAddFill className="inline h-4 w-4" viewBox="0 0 11 13" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
