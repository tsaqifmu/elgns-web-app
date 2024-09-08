import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDetail } from "@/types/production/detail/detail";
import { updateProductionDetail } from "@/lib/productionService";
import { toast } from "@/components/ui/use-toast";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

export const useUpdateProductionDetail = (
  productionId: string | undefined,
  closeEditDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (detail: IDetail) => {
      const response = updateProductionDetail(productionId, detail);
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil mengubah detail produksi.",
        description: response.data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      closeEditDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.log(error);
    },
  });
};
