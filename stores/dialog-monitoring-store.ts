import { ProductionData } from "@/types/monitoring/task";
import { create } from "zustand";

export interface DialogMonitoringState {
  detailMonitoringData?: ProductionData;
  deleteMonitoringData?: ProductionData;
}

export interface DialogMonitoringAction {
  openDetailMonitoringDialog: (data: ProductionData) => void;
  closeDetailMonitoringDialog: () => void;
}

export const useDialogMonitoringStore = create<
  DialogMonitoringState & DialogMonitoringAction
>((set) => ({
  detailMonitoringData: undefined,
  deleteMonitoringData: undefined,
  openDetailMonitoringDialog: (data: ProductionData) =>
    set({ detailMonitoringData: data }),
  closeDetailMonitoringDialog: () => set({ detailMonitoringData: undefined }),
}));
