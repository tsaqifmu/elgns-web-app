import { create } from "zustand";
import { FabricDataColumns } from "@/types/bahan/bahan-data-response";

export interface DialogFabricState {
  createFabricData?: boolean;
  detailCustomerData?: FabricDataColumns;
  editFabricData?: FabricDataColumns;
  deleteFabricData?: FabricDataColumns;
}

export interface DialogFabricAction {
  openCreateFabricDialog: () => void;
  closeCreateFabricDialog: () => void;
  openEditFabricDialog: (data: FabricDataColumns) => void;
  closeEditFabricDialog: () => void;
  openDeleteFabricDialog: (data: FabricDataColumns) => void;
  closeDeleteFabricDialog: () => void;
}

export const useDialogBahanStore = create<
  DialogFabricState & DialogFabricAction
>((set) => ({
  createFabricData: undefined,
  detailCustomerData: undefined,
  editFabricData: undefined,
  deleteFabricData: undefined,
  openCreateFabricDialog: () => set({ createFabricData: true }),
  closeCreateFabricDialog: () => set({ createFabricData: undefined }),
  openEditFabricDialog: (data: FabricDataColumns) =>
    set({ editFabricData: data }),
  closeEditFabricDialog: () => set({ editFabricData: undefined }),
  openDeleteFabricDialog: (data: FabricDataColumns) =>
    set({ deleteFabricData: data }),
  closeDeleteFabricDialog: () => set({ deleteFabricData: undefined }),
}));
