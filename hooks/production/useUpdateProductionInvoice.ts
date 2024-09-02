import { toast } from "@/components/ui/use-toast";
import { updateProductionInvoice } from "@/lib/productionService";
import { Invoice } from "@/types/production/invoice/invoice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        description: "mantap",
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      closeEditDialog();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
