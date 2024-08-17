import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogTableDelete from "./dialogTableComponent/dialog-table-delete";
import DialogTableEdit from "./dialogTableComponent/dialog-table-edit";

import DialogTableCreate from "./dialogTableComponent/dialog-table-create";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";


type DialogVariant = "tambah" | "edit" | "hapus" | "default";

interface CustomDialogProps {
  variant: DialogVariant;
  title: string;
  description?: string;
  triger?: any;

  customer?: DataCustomer;

}

const CustomeDialogTable: FC<CustomDialogProps> = ({
  variant,
  title,
  triger,

  customer,

}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "tambah":
        return {

          modal: "bg-[#5BADC5] ",
          input: "border-[#5BADC5]",
          button: "bg-[#5BADC5] hover:bg-[#2b7e97]",

        };
      case "edit":
        return {
          modal: "bg-yellow-500 ",
          input: "border-yellow-400",
          button: "bg-yellow-400 hover:bg-yellow-500",
        };
      case "hapus":
        return {
          modal: "bg-destructive",
          input: "border-yellow-400",
          button: "bg-yellow-400 hover:bg-yellow-500",
        };
      default:
        return {
          modal: "bg-gray-900 ",
          input: "border-gray-900",
          button: "bg-gray-900 hover:bg-gray-700",
        };
    }
  };

  const { modal, input, button } = getVariantStyles();

  return (
    <Dialog>
      <DialogTrigger asChild>{triger}</DialogTrigger>

      <DialogContent className="max-w-[737px] font-oswald">

        <DialogHeader className={cn(modal)}>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {variant === "hapus" ? (

          <DialogTableDelete customer={customer} />
        ) : variant === "edit" ? (
          <DialogTableEdit customer={customer} />
        ) : (
          <DialogTableCreate />

        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomeDialogTable;
