import { toast } from "@/components/ui/use-toast";
import { updateProductionOverview } from "@/lib/productionService";
import { productionOverviewSchema } from "@/schemas/productionOverviewSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const useUpdateProductionOverview = (
  productionId: string | undefined,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (overview: z.infer<typeof productionOverviewSchema>) => {
      const response = updateProductionOverview(productionId, overview);
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil mengubah overview produksi.",
        description: "mantap",
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "GAGAL mengubah overview produksi.",
        description: error.message,
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
  });
};
