import { ColumnItem } from "@/types/monitoring/column-item";
import { ProductionData } from "@/types/monitoring/task";
import { create } from "zustand";

export interface DialogMonitoringState {
  cardMonitoringId?: string;
  editMonitoringData?: ProductionData;
  column?: ColumnItem;
  deleteMonitoringData?: ProductionData;
}

export interface DialogMonitoringAction {
  setCardMonitoringId: (cardId: string) => void;
  openEditMonitoringDialog: (data: ProductionData, column?: ColumnItem) => void;
  closeEditMonitoringDialog: () => void;
}

export const useDialogMonitoringStore = create<
  DialogMonitoringState & DialogMonitoringAction
>((set) => ({
  cardMonitoringId: undefined,
  editMonitoringData: undefined,
  column: undefined,
  deleteMonitoringData: undefined,
  setCardMonitoringId: (cardId: string) => set({ cardMonitoringId: cardId }),
  openEditMonitoringDialog: (data: ProductionData, column?: ColumnItem) =>
    set({ editMonitoringData: data, column }),
  closeEditMonitoringDialog: () => set({ editMonitoringData: undefined }),
}));
