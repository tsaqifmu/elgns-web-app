import { toast } from "@/components/ui/use-toast";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";
import { updateTaskPosition } from "@/lib/monitoringService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      columnId,
    }: {
      taskId: string;
      columnId: string;
    }) => {
      const response = updateTaskPosition(taskId, columnId);
      return response;
    },
    onSuccess: (response) => {
      console.log("response", response);
      toast({
        variant: "default",
        title: "Berhasil memindahkan data.",
        description: response?.message,
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
    onError: (error) => {
      handleArrayError(error, toast);
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
  });
};
