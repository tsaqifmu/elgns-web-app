import { DataCustomer } from "@/components/dashboard/customer/columns";
import { create } from "zustand";

export interface DialogState {
  createCustomerData?: boolean;
  detailCustomerData?: DataCustomer;
  editCustomerData?: DataCustomer;
  deleteCustomerData?: DataCustomer;
}

export interface DialogAction {
  openCreateCustomerDialog: () => void;
  closeCreateCustomerDialog: () => void;
  openDetailCustomerDialog: (data: DataCustomer) => void;
  closeDetailCustomerDialog: () => void;
  openEditCustomerDialog: (data: DataCustomer) => void;
  closeEditCustomerDialog: () => void;
  openDeleteCustomerDialog: (data: DataCustomer) => void;
  closeDeleteCustomerDialog: () => void;
}

export const useDialogStore = create<DialogState & DialogAction>((set) => ({
  createCustomerData: undefined,
  detailCustomerData: undefined,
  editCustomerData: undefined,
  deleteCustomerData: undefined,
  openCreateCustomerDialog: () => set({ createCustomerData: true }),
  closeCreateCustomerDialog: () => set({ createCustomerData: undefined }),
  openDetailCustomerDialog: (data: DataCustomer) =>
    set({ detailCustomerData: data }),
  closeDetailCustomerDialog: () => set({ detailCustomerData: undefined }),
  openEditCustomerDialog: (data: DataCustomer) =>
    set({ editCustomerData: data }),
  closeEditCustomerDialog: () => set({ editCustomerData: undefined }),
  openDeleteCustomerDialog: (data: DataCustomer) =>
    set({ deleteCustomerData: data }),
  closeDeleteCustomerDialog: () => set({ deleteCustomerData: undefined }),
}));
