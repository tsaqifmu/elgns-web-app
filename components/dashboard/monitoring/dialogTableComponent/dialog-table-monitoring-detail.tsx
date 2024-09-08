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
import {
  DialogProductionAction,
  DialogProductionState,
  useDialogProductionStore,
} from "@/stores/dialog-production-store";
import { MonitoringOverview } from "./overview/monitoring-overview";
import { MonitoringDetail } from "./detail/monitoring-detail";
import MonitoringTimeline from "./timeline/monitoring-timeline";
import {
  DialogMonitoringAction,
  DialogMonitoringState,
  useDialogMonitoringStore,
} from "@/stores/dialog-monitoring-store";

const DialogTableMonitoringDetail = () => {
  const menus = ["OVERVIEW", "DETAIL", "TIMELINE"];
  const [activeMenu, setActiveMenu] = useState("OVERVIEW");
  const [detailMonitoringData, closeDetailMonitoringDialog] =
    useDialogMonitoringStore(
      useShallow((state: DialogMonitoringState & DialogMonitoringAction) => [
        state.detailMonitoringData,
        state.closeDetailMonitoringDialog,
      ]),
    );

  const isOpen = detailMonitoringData !== undefined;
  const getContentComponent = () => {
    switch (activeMenu) {
      case "OVERVIEW":
        return <MonitoringOverview />;
      case "DETAIL":
        return <MonitoringDetail />;
      default:
        return <MonitoringTimeline />;
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
    <Dialog open={isOpen} onOpenChange={closeDetailMonitoringDialog}>
      <DialogContent
        className={cn("overflow-x-hidden font-oswald", getContentWidth())}
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

export default DialogTableMonitoringDetail;
