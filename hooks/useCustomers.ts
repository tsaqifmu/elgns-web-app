import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as customerService from "../lib/customerService";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
  });
};

// export const useCustomer = (id: string) => {
//   return useQuery(["customer", id], () => customerService.getCustomer(id));
// };

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: DataCustomer) => {
      return customerService.addCustomer(customer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// export const useUpdateCustomer = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ id, data }: { id: string; data: DataCustomer }) =>
//       customerService.updateCustomer(id, data),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("customers");
//       },
//     },
//   );
// };

// export const useDeleteCustomer = () => {
//   const queryClient = useQueryClient();
//   return useMutation(customerService.deleteCustomer, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("customers");
//     },
//   });
// };
