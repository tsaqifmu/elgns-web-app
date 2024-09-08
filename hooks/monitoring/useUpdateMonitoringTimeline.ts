import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Invoice } from "@/types/production/invoice/invoice";

import { updateProductionInvoice } from "@/lib/productionService";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

import { toast } from "@/components/ui/use-toast";

export const useUpdateProductionInvoice = (
  productionId: string | undefined,
  closeEditDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: Invoice) => {
      const response = updateProductionInvoice(productionId, invoice);
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil mengubah invoice produksi.",
        description: response.data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      closeEditDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};
