import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Detail } from "@/types/production/detail/detail";
import { updateProductionDetail } from "@/lib/productionService";

import { toast } from "@/components/ui/use-toast";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

export const useUpdateProductionDetail = (
  productionId: string | undefined,
  closeEditDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (detail: Detail) => {
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

  // return useMutation({
  //   mutationFn: async (data: any) => {
  //     const response = await apiRequest({
  //       path: "/production/update",
  //       method: HttpMethod.POST,
  //       params: { productionId: productionId },
  //       data,
  //     });
  //     return response;
  //   },
  //   onSuccess: (response) => {
  //     toast({
  //       variant: "default",
  //       title: "Berhasil mengubah data",
  //       description: response.data.message,
  //     });
  //     queryClient.invalidateQueries({ queryKey: ["productions"] });
  //     closeEditDialog();
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });
};
