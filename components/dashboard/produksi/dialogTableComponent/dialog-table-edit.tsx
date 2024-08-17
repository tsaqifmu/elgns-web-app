"use client";

import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Overview } from "../overview";
import { Detail } from "../detail";
import { Invoice } from "../invoice";

interface DialogTableEdit {
  triger?: any;
}

const DialogTableEdit: FC<DialogTableEdit> = ({ triger }) => {
  const menus = ["OVERVIEW", "DETAIL", "INVOICE"];
  const [activeMenu, setActiveMenu] = useState("OVERVIEW");

  const getContentComponent = () => {
    switch (activeMenu) {
      case "OVERVIEW":
        return <Overview />;
      case "DETAIL":
        return <Detail />;
      default:
        return <Invoice />;
    }
  };

  const getContentWidth = () => {
    switch (activeMenu) {
      case "DETAIL":
        return "max-w-7xl";
      default:
        return "max-w-[737px]";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triger}</DialogTrigger>
      <DialogContent
        className={cn("m-2 overflow-x-hidden font-oswald", getContentWidth())}
      >
        <DialogHeader className="border border-gray-300 bg-gray-100 px-3 pb-0 pt-1">
          <DialogTitle className="flex h-full w-full gap-4">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => {
                  setActiveMenu(menu);
                }}
                className={cn(
                  "h-full border-gray-900 py-3 text-gray-400 transition-all hover:border-b-2 hover:text-gray-900",
                  activeMenu === menu ? "border-b-2 text-gray-900" : "",
                )}
              >
                {menu}
              </button>
            ))}
          </DialogTitle>
        </DialogHeader>
        {getContentComponent()}
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableEdit;
