import { ProductionData } from "@/types/monitoring/task";
import { create } from "zustand";

export interface DialogMonitoringState {
  cardMonitoringId?: string;
  editMonitoringData?: ProductionData;
  deleteMonitoringData?: ProductionData;
}

export interface DialogMonitoringAction {
  setCardMonitoringId: (cardId: string) => void;
  openEditMonitoringDialog: (data: ProductionData) => void;
  closeEditMonitoringDialog: () => void;
}

export const useDialogMonitoringStore = create<
  DialogMonitoringState & DialogMonitoringAction
>((set) => ({
  cardMonitoringId: undefined,
  editMonitoringData: undefined,
  deleteMonitoringData: undefined,
  setCardMonitoringId: (cardId: string) => set({ cardMonitoringId: cardId }),
  openEditMonitoringDialog: (data: ProductionData) =>
    set({ editMonitoringData: data }),
  closeEditMonitoringDialog: () => set({ editMonitoringData: undefined }),
}));
