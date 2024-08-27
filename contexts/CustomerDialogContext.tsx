"use client";
import { DataCustomer } from "@/components/dashboard/customer/columns";
import { useContext, createContext, useState, FC } from "react";

const CustomerDialogContext = createContext<CustomerDialogContextType>(
  {} as CustomerDialogContextType,
);

interface CustomerDialogContextType {
  dialogType: string;
  customer: DataCustomer;
  openDialog: (type: string, data: DataCustomer) => void;
  closeDialog: () => void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const CustomerDialogProvider: FC<DialogProviderProps> = ({
  children,
}) => {
  const [dialogType, setDialogType] = useState<string>("");
  const [customer, setCustomer] = useState<DataCustomer>({} as DataCustomer);

  const openDialog = (type: string, data: DataCustomer) => {
    setDialogType(type);
    setCustomer(data);
  };

  const closeDialog = () => {
    setDialogType("");
    setCustomer({} as DataCustomer);
  };

  return (
    <CustomerDialogContext.Provider
      value={{
        dialogType,
        customer,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </CustomerDialogContext.Provider>
  );
};

export const useCustomerDialog = (): CustomerDialogContextType => {
  const context = useContext(CustomerDialogContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerDialog must be used within a CustomerDialogProvider",
    );
  }
  return context;
};
