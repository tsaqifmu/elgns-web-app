import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateMonitoringOverview,
  updateProductionOverview,
} from "@/lib/productionService";
import { monitoringOverviewSchema } from "@/schemas/monitoringOverviewSchema";

import { toast } from "@/components/ui/use-toast";

export const useUpdateMonitoringOverview = (
  productionId: string | undefined,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (overview: z.infer<typeof monitoringOverviewSchema>) => {
      const response = updateMonitoringOverview(
        productionId,
        overview,
        "",
        "boardname",
      );
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil mengubah card overview.",
        description: "Successfully updated card overview.",
      });
      queryClient.invalidateQueries({
        queryKey: ["monitoringOverview", productionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "GAGAL mengubah overview card.",
        description: error.message,
      });
    },
  });
};
