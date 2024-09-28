"use client";

import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { MonitoringOverview } from "./overview/monitoring-overview";
import { MonitoringDetail } from "./detail/monitoring-detail";
import MonitoringTimeline from "./timeline/monitoring-timeline";
import {
  DialogMonitoringAction,
  DialogMonitoringState,
  useDialogMonitoringStore,
} from "@/stores/dialog-monitoring-store";
import { MonitoringInvoice } from "./invoice/monitoring-invoice";

const DialogTableMonitoringDetail = () => {
  const menus = ["OVERVIEW", "DETAIL", "TIMELINE", "INVOICE"];
  const [activeMenu, setActiveMenu] = useState("OVERVIEW");
  const [detailMonitoringData, closeDetailMonitoringDialog] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.editMonitoringData,
        state.closeEditMonitoringDialog,
      ]),
    );

  const isOpen = detailMonitoringData !== undefined;
  const getContentComponent = () => {
    switch (activeMenu) {
      case "OVERVIEW":
        return <MonitoringOverview />;
      case "DETAIL":
        return <MonitoringDetail />;
      case "TIMELINE":
        return <MonitoringTimeline />;
      default:
        return <MonitoringInvoice />;
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
    <Dialog open={isOpen} onOpenChange={closeDetailMonitoringDialog}>
      <DialogContent
        className={cn(
          "scrollbar-hide max-h-screen overflow-scroll font-oswald",
          getContentWidth(),
        )}
      >
        <DialogHeader className="box-border border border-gray-300 bg-gray-100 px-3 pb-0 pt-1">
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

export default DialogTableMonitoringDetail;
