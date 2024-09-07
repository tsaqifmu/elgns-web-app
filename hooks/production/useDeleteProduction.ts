import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { deleteProduction } from "@/lib/productionService";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

export const useDeleteProduction = (
  productionId: string | undefined,
  closeProductionDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = deleteProduction(productionId);

      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menghapus data",
        description: response?.data.message,
      });
      closeProductionDialog();
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
    onError: (error) => {
      handleArrayError(error, toast);
    },
  });
};
