import { create } from "zustand";
import { BahanDataColumns } from "@/types/bahan/bahan-data-response";

export interface DialogBahanState {
  createBahanData?: boolean;
  detailCustomerData?: BahanDataColumns;
  editBahanData?: BahanDataColumns;
  deleteBahanData?: BahanDataColumns;
}

export interface DialogBahanAction {
  openCreateBahanDialog: () => void;
  closeCreateBahanDialog: () => void;
  openEditBahanDialog: (data: BahanDataColumns) => void;
  closeEditBahanDialog: () => void;
  openDeleteBahanDialog: (data: BahanDataColumns) => void;
  closeDeleteBahanDialog: () => void;
}

export const useDialogBahanStore = create<DialogBahanState & DialogBahanAction>(
  (set) => ({
    createBahanData: undefined,
    detailCustomerData: undefined,
    editBahanData: undefined,
    deleteBahanData: undefined,
    openCreateBahanDialog: () => set({ createBahanData: true }),
    closeCreateBahanDialog: () => set({ createBahanData: undefined }),
    openEditBahanDialog: (data: BahanDataColumns) =>
      set({ editBahanData: data }),
    closeEditBahanDialog: () => set({ editBahanData: undefined }),
    openDeleteBahanDialog: (data: BahanDataColumns) =>
      set({ deleteBahanData: data }),
    closeDeleteBahanDialog: () => set({ deleteBahanData: undefined }),
  }),
);
