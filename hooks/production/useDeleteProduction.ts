import { toast } from "@/components/ui/use-toast";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { deleteProduction } from "@/lib/productionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        description: "mantap",
      });
      closeProductionDialog();
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Berhasil menghapus data",
        description: error.message.toString(),
      });
    },
  });
};
