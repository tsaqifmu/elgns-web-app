"use client";

import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ProductionOverview } from "./overview/production-overview";
import { ProductionDetail } from "./detail/production-detail";
import { ProductionInvoice } from "./invoice/production-invoice";
import { useShallow } from "zustand/react/shallow";
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import { DialogTableMenusProduction } from "./dialog-table-menus";

const DialogTableEdit = () => {
  const menus = ["OVERVIEW", "DETAIL", "INVOICE"];
  const [activeMenu, setActiveMenu] = useState("OVERVIEW");
  const [editProductionData, closeEditProductionDialog] =
    useDialogProductionStore(
      useShallow((state: DialogProductionState & DialogProductionAction) => [
        state.editProductionData,
        state.closeEditProductionDialog,
      ]),
    );

  const isOpen = editProductionData !== undefined;
  const getContentComponent = () => {
    switch (activeMenu) {
      case "OVERVIEW":
        return <ProductionOverview />;
      case "DETAIL":
        return <ProductionDetail />;
      default:
        return <ProductionInvoice />;
    }
  };

  const getContentWidth = () => {
    switch (activeMenu) {
      case "DETAIL":
        return "max-w-[86rem]";
      default:
        return "max-w-[737px]";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeEditProductionDialog}>
      <DialogContent
        className={cn(
          "scrollbar-hide max-h-screen overflow-scroll font-oswald",
          getContentWidth(),
        )}
      >
        <DialogHeader className="box-border border border-gray-300 bg-gray-100 px-3 pb-0 pt-1">
          <DialogTitle className="flex h-full w-full gap-4">
            <DialogTableMenusProduction
              menus={menus}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </DialogTitle>
        </DialogHeader>
        {getContentComponent()}
      </DialogContent>
    </Dialog>
  );
};

export default DialogTableEdit;
