import { Production } from "@/hooks/production/useFetchProductions";
import { create } from "zustand";

export interface DialogProductionState {
  editProductionData?: Production;
  deleteProductionData?: Production;
}

export interface DialogProductionAction {
  openEditProductionDialog: (data: Production) => void;
  closeEditProductionDialog: () => void;
  openDeleteProductionDialog: (data: Production) => void;
  closeDeleteProductionDialog: () => void;
}

export const useDialogProductionStore = create<
  DialogProductionState & DialogProductionAction
>((set) => ({
  editProductionData: undefined,
  deleteProductionData: undefined,
  openEditProductionDialog: (data: Production) =>
    set({ editProductionData: data }),
  closeEditProductionDialog: () => set({ editProductionData: undefined }),
  openDeleteProductionDialog: (data: Production) =>
    set({ deleteProductionData: data }),
  closeDeleteProductionDialog: () => set({ deleteProductionData: undefined }),
}));
