import { create } from "zustand";
import { UserDataColumns } from "@/types/admin/user-data-response";

export interface DialogAdminState {
  createAdminData?: boolean;
  detailCustomerData?: UserDataColumns;
  editAdminData?: UserDataColumns;
  deleteAdminData?: UserDataColumns;
}

export interface DialogAdminAction {
  openCreateAdminDialog: () => void;
  closeCreateAdminDialog: () => void;
  openEditAdminDialog: (data: UserDataColumns) => void;
  closeEditAdminDialog: () => void;
  openDeleteAdminDialog: (data: UserDataColumns) => void;
  closeDeleteAdminDialog: () => void;
}

export const useDialogAdminStore = create<DialogAdminState & DialogAdminAction>(
  (set) => ({
    createAdminData: undefined,
    detailCustomerData: undefined,
    editAdminData: undefined,
    deleteAdminData: undefined,
    openCreateAdminDialog: () => set({ createAdminData: true }),
    closeCreateAdminDialog: () => set({ createAdminData: undefined }),
    openEditAdminDialog: (data: UserDataColumns) =>
      set({ editAdminData: data }),
    closeEditAdminDialog: () => set({ editAdminData: undefined }),
    openDeleteAdminDialog: (data: UserDataColumns) =>
      set({ deleteAdminData: data }),
    closeDeleteAdminDialog: () => set({ deleteAdminData: undefined }),
  }),
);
