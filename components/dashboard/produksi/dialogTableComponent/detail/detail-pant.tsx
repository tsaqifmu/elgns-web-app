import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
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
import { Pant } from "@/types/production/detail/pant";

export const DetailPant = ({
  pants,
  setPants,
}: {
  pants: Pant[];
  setPants: Dispatch<SetStateAction<Pant[]>>;
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    changedPant: Pant,
  ) => {
    const { name, value } = e.target;
    setPants((prevPants: Pant[]) => {
      const updatedPants = prevPants.map((prevPant: Pant) =>
        prevPant.id === changedPant.id
          ? { ...prevPant, [name]: value }
          : { ...prevPant },
      );
      return [...updatedPants];
    });
  };

  const handleAddPant = () => {
    setPants((prevData: Pant[]) => [
      ...prevData,
      {
        id: crypto.randomUUID(),
        printingPant: "",
        material: "",
        pattern: "",
        color: "",
        sleeve: "",
        sizeS: 0,
        sizeM: 0,
        sizeL: 0,
        sizeXL: 0,
        sizeXXL: 0,
        size3XL: 0,
        size5XL: 0,
        size6XL: 0,
        size7XL: 0,
        custom: 0,
        total: 0,
      },
    ]);
  };

  return (
    <div>
      <div className="flex justify-between font-medium">
        <h1>CELANA</h1>
        <h1>TOTAL: {pants.length}</h1>
      </div>
      <div className="flex gap-2">
        <div className="mt-2 max-h-[10rem] grow overflow-y-scroll rounded-md border border-gray-900">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-sm text-white">NO</TableHead>
                <TableHead className="w-32 py-0 text-sm text-white">
                  SABLON CELANA
                </TableHead>
                <TableHead className="w-32 py-0 text-sm text-white">
                  BAHAN
                </TableHead>
                <TableHead className="w-24 py-0 text-sm text-white">
                  POLA
                </TableHead>
                <TableHead className="w-24 py-0 text-sm text-white">
                  WARNA
                </TableHead>
                <TableHead className="w-24 py-0 text-sm text-white">
                  LENGAN
                </TableHead>
                <TableHead className="py-0 text-sm text-white">S</TableHead>
                <TableHead className="py-0 text-sm text-white">M</TableHead>
                <TableHead className="py-0 text-sm text-white">L</TableHead>
                <TableHead className="py-0 text-sm text-white">XL</TableHead>
                <TableHead className="py-0 text-sm text-white">XXL</TableHead>
                <TableHead className="py-0 text-sm text-white">3XL</TableHead>
                <TableHead className="py-0 text-sm text-white">5XL</TableHead>
                <TableHead className="py-0 text-sm text-white">6XL</TableHead>
                <TableHead className="py-0 text-sm text-white">7XL</TableHead>
                <TableHead className="py-0 text-sm text-white">
                  CUSTOM
                </TableHead>
                <TableHead className="py-0 text-sm text-white">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pants.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="printingPant"
                      value={item.printingPant}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="material"
                      value={item.material}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="pattern"
                      value={item.pattern}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="color"
                      value={item.color}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sleeve"
                      value={item.sleeve}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sizeS"
                      value={item.sizeS}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sizeM"
                      value={item.sizeM}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sizeL"
                      value={item.sizeL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sizeXL"
                      value={item.sizeXL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="sizeXXL"
                      value={item.sizeXXL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="size3XL"
                      value={item.size3XL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="size5XL"
                      value={item.size5XL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="size6XL"
                      value={item.size6XL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="size7XL"
                      value={item.size7XL}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="custom"
                      value={item.custom}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </TableCell>
                  <TableCell className="p-2 text-sm">
                    <Input
                      className="rounded-none bg-transparent p-1 uppercase"
                      type="text"
                      name="total"
                      value={item.total}
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
            className="flex items-center justify-center rounded-sm bg-gray-900 px-1 py-4 text-white hover:bg-gray-700"
            onClick={handleAddPant}
          >
            <IconAddFill className="inline h-4 w-4" viewBox="0 0 11 13" />
          </button>
        </div>
      </div>
    </div>
  );
};