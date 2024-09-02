import { ProductionItem } from "@/types/production/production-item";
import { create } from "zustand";

export interface DialogProductionState {
  editProductionData?: ProductionItem;
  deleteProductionData?: ProductionItem;
}

export interface DialogProductionAction {
  openEditProductionDialog: (data: ProductionItem) => void;
  closeEditProductionDialog: () => void;
  openDeleteProductionDialog: (data: ProductionItem) => void;
  closeDeleteProductionDialog: () => void;
}

export const useDialogProductionStore = create<
  DialogProductionState & DialogProductionAction
>((set) => ({
  editProductionData: undefined,
  deleteProductionData: undefined,
  openEditProductionDialog: (data: ProductionItem) =>
    set({ editProductionData: data }),
  closeEditProductionDialog: () => set({ editProductionData: undefined }),
  openDeleteProductionDialog: (data: ProductionItem) =>
    set({ deleteProductionData: data }),
  closeDeleteProductionDialog: () => set({ deleteProductionData: undefined }),
}));
