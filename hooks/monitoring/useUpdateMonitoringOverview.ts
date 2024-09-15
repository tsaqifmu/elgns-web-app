import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { monitoringOverviewSchema } from "@/schemas/monitoringOverviewSchema";

import { toast } from "@/components/ui/use-toast";
import {
  getBoardName,
  updateMonitoringOverview,
} from "@/lib/monitoringService";

export const useUpdateMonitoringOverview = (
  productionId: string | undefined,
  cardId: string | undefined,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (overview: z.infer<typeof monitoringOverviewSchema>) => {
      const boardName = await getBoardName(cardId);
      const response = await updateMonitoringOverview(
        productionId,
        overview,
        cardId,
        boardName,
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
      window.location.reload();
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
