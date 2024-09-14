import { create } from "zustand";
import { UserDataColumns } from "@/types/admin/user-data-response";

export interface DialogAdminState {
  createAdminData?: boolean;
  detailCustomerData?: UserDataColumns;
  editCustomerData?: UserDataColumns;
  deleteCustomerData?: UserDataColumns;
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
    editCustomerData: undefined,
    deleteCustomerData: undefined,
    openCreateAdminDialog: () => set({ createAdminData: true }),
    closeCreateAdminDialog: () => set({ createAdminData: undefined }),
    openEditAdminDialog: (data: UserDataColumns) =>
      set({ editCustomerData: data }),
    closeEditAdminDialog: () => set({ editCustomerData: undefined }),
    openDeleteAdminDialog: (data: UserDataColumns) =>
      set({ deleteCustomerData: data }),
    closeDeleteAdminDialog: () => set({ deleteCustomerData: undefined }),
  }),
);
