import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

type DialogVariant = "tambah" | "edit" | "hapus" | "default";

interface CustomDialogProps {
  variant: DialogVariant;
  title: string;
  description?: string;
  triger?: any;
  content?: ReactNode;
}

const CustomeDialogTable: FC<CustomDialogProps> = ({
  variant,
  title,
  triger,
  content,
  description,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "tambah":
        return {
          modal: "bg-green-200 ",
          input: "border-green-400",
          button: "bg-green-400 hover:bg-green-500",
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
      <DialogContent className="font-oswald max-w-[737px]">
        <DialogHeader className={cn(modal)}>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {variant === "hapus" ? (
          <DialogTableDelete content="content" />
        ) : (variant === "edit") ? (
          <DialogTableEdit />
        ) : (<DialogTableCreate/>)}
      </DialogContent>
    </Dialog>
  );
};

export default CustomeDialogTable;
