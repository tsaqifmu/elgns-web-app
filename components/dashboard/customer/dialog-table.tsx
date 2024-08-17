import { FC } from "react";
import { cn } from "@/lib/utils";

import { DataCustomer } from "@/app/(dashboard)/customer/columns";

import DialogTableDelete from "./dialogTableComponent/dialog-table-delete";
import DialogTableEdit from "./dialogTableComponent/dialog-table-edit";
import DialogTableCreate from "./dialogTableComponent/dialog-table-create";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogTableDetail from "./dialogTableComponent/dialog-table-detail";

type DialogVariant = "tambah" | "edit" | "hapus" | "detail" | "default";

interface CustomDialogProps {
  variant: DialogVariant;
  title: string;
  description?: string;
  triger?: any;
  customer?: DataCustomer;
  isOpen?: boolean;
  onClose?: () => void;
  setIsDialogEditOpen?: (open: boolean) => void;
}

const CustomeDialogTable: FC<CustomDialogProps> = ({
  variant,
  title,
  triger,
  customer,
  isOpen,
  onClose,
  setIsDialogEditOpen,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "tambah":
        return {
          modal: "bg-teal ",
          input: "border-teal",
          button: "bg-teal hover:bg-[#2b7e97]",
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
      case "detail":
        return {
          modal: "bg-gray-900 ",
          input: "border-gray-900",
          button: "bg-gray-900 hover:bg-gray-700",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{triger}</DialogTrigger>

      <DialogContent className="max-w-[737px]">
        <DialogHeader className={cn(modal)}>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {variant === "hapus" ? (
          <DialogTableDelete customer={customer} />
        ) : variant === "edit" ? (
          <DialogTableEdit customer={customer} />
        ) : variant === "detail" ? (
          <DialogTableDetail
            customer={customer}
            setIsDialogEditOpen={setIsDialogEditOpen}
          />
        ) : (
          <DialogTableCreate />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomeDialogTable;
