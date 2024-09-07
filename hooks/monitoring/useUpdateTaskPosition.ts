import { toast } from "@/components/ui/use-toast";
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
      toast({
        variant: "default",
        title: "Berhasil memindahkan data.",
        description: "mantap",
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "GAGAL memindahkan data.",
        description: error.message,
      });
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
  });
};
