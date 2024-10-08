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
import { getEmptyShirtData, Shirt } from "@/types/production/detail/shirt";
import { cn } from "@/lib/utils";
import { MyCombobox } from "./my-combobox";
import { MaterialAndColor } from "@/types/production/detail/material-and-color";

interface DetailShirtProps {
  shirts: Shirt[];
  setShirts: Dispatch<SetStateAction<Shirt[]>>;
  setTotalItems: () => void;
  isReadOnly?: boolean;
  materialsAndColors?: MaterialAndColor[];
}

export const DetailShirt = ({
  shirts,
  setShirts,
  setTotalItems,
  isReadOnly = false,
  materialsAndColors = [],
}: DetailShirtProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, curShirt: Shirt) => {
    const { name, value } = e.target;
    let updatedCurrentShirt: Shirt = curShirt;

    if (name.includes("size") || name === "custom") {
      let newValue = isNaN(parseInt(value)) ? 0 : parseInt(value);
      let totalShirts = 0;
      Object.keys(curShirt).forEach((key) => {
        if (key === name) {
          totalShirts += newValue;
        } else if (key.includes("size") || key === "custom") {
          totalShirts += updatedCurrentShirt[key as keyof Shirt] as number;
        }
      });

      updatedCurrentShirt = {
        ...curShirt,
        [name]: newValue,
        total: totalShirts,
      };
    } else {
      updatedCurrentShirt = {
        ...curShirt,
        [name]: value,
      };
    }

    setShirts((prevShirts: Shirt[]) => {
      const updatedShirts = prevShirts.map((prevShirt: Shirt) =>
        prevShirt.id === curShirt.id ? updatedCurrentShirt : { ...prevShirt },
      );
      return [...updatedShirts];
    });
  };

  const handleComboboxMaterialChange = ({ curItem, selectedValue }: any) => {
    let updatedCurrentShirt = curItem;
    updatedCurrentShirt = {
      ...curItem,
      material: selectedValue,
      color: "",
    };

    setShirts((prevShirts: Shirt[]) => {
      const updatedShirts = prevShirts.map((prevShirt: Shirt) =>
        prevShirt.id === curItem.id ? updatedCurrentShirt : { ...prevShirt },
      );
      return [...updatedShirts];
    });
  };

  const handleComboboxColorChange = ({ curItem, selectedValue }: any) => {
    let updatedCurrentShirt = curItem;

    updatedCurrentShirt = {
      ...curItem,
      color: selectedValue,
    };

    setShirts((prevShirts: Shirt[]) => {
      const updatedShirts = prevShirts.map((prevShirt: Shirt) =>
        prevShirt.id === curItem.id ? updatedCurrentShirt : { ...prevShirt },
      );
      return [...updatedShirts];
    });
  };

  const handleAddShirt = () => {
    setShirts((prevData: Shirt[]) => [...prevData, getEmptyShirtData()]);
  };

  useEffect(() => {
    setTotalItems();
  }, [shirts, setTotalItems]);

  return (
    <div className="-mt-2 flex gap-2">
      <div className="max-h-[10rem] grow overflow-y-scroll rounded-md border border-gray-900">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead className="text-sm text-white">NO</TableHead>
              <TableHead className="w-32 py-0 text-sm text-white">
                SABLON BAJU
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
              <TableHead className="w-24 py-0 text-sm text-white">
                BAHAN KERAH
              </TableHead>
              <TableHead className="w-24 py-0 text-sm text-white">
                POLA KERAH
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
              <TableHead className="py-0 text-sm text-white">CUSTOM</TableHead>
              <TableHead className="py-0 text-sm text-white">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shirts.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-sm">{index + 1}</TableCell>
                <TableCell className="p-2 text-sm">
                  <Input
                    readOnly={isReadOnly}
                    className={cn(
                      "rounded-none bg-transparent p-1 uppercase",
                      isReadOnly && "border-none",
                    )}
                    type="text"
                    name="printingShirt"
                    value={item.printingShirt}
                    onChange={(e) => handleChange(e, item)}
                  />
                </TableCell>

                <TableCell className="p-2 text-sm">
                  {isReadOnly && (
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1",
                        isReadOnly && "border-none",
                      )}
                      type="text"
                      name="material"
                      value={item.material}
                      onChange={(e) => handleChange(e, item)}
                    />
                  )}

                  {!isReadOnly && (
                    <MyCombobox
                      value={item.material}
                      setValue={handleComboboxMaterialChange}
                      options={materialsAndColors?.map(
                        (item: MaterialAndColor) => item.materialName,
                      )}
                      placeholder={"Pilih Bahan..."}
                      item={item}
                    />
                  )}
                </TableCell>
                <TableCell className="p-2 text-sm">
                  <Input
                    readOnly={isReadOnly}
                    className={cn(
                      "rounded-none bg-transparent p-1 uppercase",
                      isReadOnly && "border-none",
                    )}
                    type="text"
                    name="pattern"
                    value={item.pattern}
                    onChange={(e) => handleChange(e, item)}
                  />
                </TableCell>
                <TableCell className="p-2 text-sm">
                  {isReadOnly && (
                    <Input
                      readOnly={isReadOnly}
                      className={cn(
                        "rounded-none bg-transparent p-1",
                        isReadOnly && "border-none",
                      )}
                      type="text"
                      name="color"
                      value={item.color}
                      onChange={(e) => handleChange(e, item)}
                    />
                  )}
                  {!isReadOnly && (
                    <MyCombobox
                      value={item.color}
                      setValue={handleComboboxColorChange}
                      options={
                        materialsAndColors.find(
                          (i: MaterialAndColor) =>
                            i.materialName === item.material,
                        )?.colors ?? []
                      }
                      placeholder={"Pilih Warna..."}
                      item={item}
                    />
                  )}
                </TableCell>
                <TableCell className="p-2 text-sm">
                  <Input
                    readOnly={isReadOnly}
                    className={cn(
                      "rounded-none bg-transparent p-1 uppercase",
                      isReadOnly && "border-none",
                    )}
                    type="text"
                    name="sleeve"
                    value={item.sleeve}
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
                    type="text"
                    name="materialCollar"
                    value={item.materialCollar}
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
                    type="text"
                    name="patternCollar"
                    value={item.patternCollar}
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
                    type="text"
                    name="sizeS"
                    value={item.sizeS}
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
                    type="text"
                    name="sizeM"
                    value={item.sizeM}
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
                    type="text"
                    name="sizeL"
                    value={item.sizeL}
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
                    type="text"
                    name="sizeXL"
                    value={item.sizeXL}
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
                    type="text"
                    name="sizeXXL"
                    value={item.sizeXXL}
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
                    type="text"
                    name="size3XL"
                    value={item.size3XL}
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
                    type="text"
                    name="size5XL"
                    value={item.size5XL}
                    onChange={(e) => handleChange(e, item)}
                  />
                </TableCell>
                <TableCell className="p-2 text-sm">
                  <Input
                    className={cn(
                      "rounded-none bg-transparent p-1 uppercase",
                      isReadOnly && "border-none",
                    )}
                    type="text"
                    name="size6XL"
                    value={item.size6XL}
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
                    type="text"
                    name="size7XL"
                    value={item.size7XL}
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
      {!isReadOnly && (
        <div className="flex items-end">
          <button
            className="flex items-center justify-center rounded-sm bg-gray-900 px-1 py-4 text-white hover:bg-gray-700"
            onClick={handleAddShirt}
          >
            <IconAddFill className="inline h-4 w-4" viewBox="0 0 11 13" />
          </button>
        </div>
      )}
    </div>
  );
};
