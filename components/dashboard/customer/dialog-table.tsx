// import { FC, useState } from "react";
// import { cn } from "@/lib/utils";

// import { DataCustomer } from "@/app/(dashboard)/customer/columns";

// import DialogTableDelete from "./dialogTableComponent/dialog-table-delete";
// import DialogTableEdit from "./dialogTableComponent/dialog-table-edit";
// import DialogTableCreate from "./dialogTableComponent/dialog-table-create";

// import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// type DialogVariant = "tambah" | "edit" | "hapus" | "detail" | "default";

// interface CustomDialogProps {
//   variant: DialogVariant;
//   description?: string;
//   triger?: any;
//   customer?: DataCustomer;
//   onClose?: () => void;
//   isOpen: boolean;
//   setIsOpen?: (open: boolean) => void;
// }

// const CustomeDialogTable: FC<CustomDialogProps> = ({
//   variant,
//   triger,
//   customer,
//   isOpen,
//   setIsOpen,
// }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>{triger}</DialogTrigger>
//       {variant === "hapus" ? (
//         <DialogTableDelete customer={customer} />
//       ) : variant === "edit" ? (
//         <DialogTableEdit
//           customer={customer}
//           isEdit={true}
//           setIsOpen={setIsOpen}
//         />
//       ) : variant === "detail" ? (
//         <DialogTableEdit
//           customer={customer}
//           isEdit={false}
//           setIsOpen={setIsOpen}
//         />
//       ) : (
//         <DialogTableCreate />
//       )}
//     </Dialog>
//   );
// };

// export default CustomeDialogTable;
