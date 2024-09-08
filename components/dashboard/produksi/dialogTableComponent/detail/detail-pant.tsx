import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
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
import { emptyPantData, Pant } from "@/types/production/detail/pant";

interface DetailPantProps {
  pants: Pant[];
  setPants: Dispatch<SetStateAction<Pant[]>>;
  setTotalItems: () => void;
}

export const DetailPant = ({
  pants,
  setPants,
  setTotalItems,
}: DetailPantProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, curPant: Pant) => {
    const { name, value } = e.target;
    let updatedCurrentPant: Pant = curPant;

    if (name.includes("size") || name === "custom") {
      let newValue = isNaN(parseInt(value)) ? 0 : parseInt(value);
      let totalPants = 0;
      Object.keys(curPant).forEach((key) => {
        if (key === name) {
          totalPants += newValue;
        } else if (key.includes("size") || key === "custom") {
          totalPants += updatedCurrentPant[key as keyof Pant] as number;
        }
      });

      updatedCurrentPant = {
        ...curPant,
        [name]: newValue,
        total: totalPants,
      };
    } else {
      updatedCurrentPant = {
        ...curPant,
        [name]: value,
      };
    }

    setPants((prevPants: Pant[]) => {
      const updatedPants = prevPants.map((prevPant: Pant) =>
        prevPant.id === curPant.id ? updatedCurrentPant : { ...prevPant },
      );
      return [...updatedPants];
    });
  };

  const handleAddPant = () => {
    setPants((prevData: Pant[]) => [...prevData, emptyPantData]);
  };

  useEffect(() => {
    setTotalItems();
  }, [pants, setTotalItems]);

  return (
    <div>
      <div className="flex justify-between font-medium">
        <h1>CELANA</h1>
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
                      readOnly
                      className="rounded-none border-none bg-transparent p-1 uppercase"
                      type="text"
                      name="total"
                      value={item.total}
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
