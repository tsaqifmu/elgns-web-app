import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

import { toast } from "@/components/ui/use-toast";

export const useFetchFabricData = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString() || "1";
  const limit = searchParams.get("pageSize")?.toString() || "5";
  const color = searchParams.get("fabricColor")?.toString() || "other";

  return useQuery({
    queryKey: ["fabric", page, limit, color],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/bahan/list",
        method: HttpMethod.GET,
        params: {
          // alphabet: "",
          // year: "2024",
          // month: "",
          // week: "",
          // name: "",
          // status: "",
          page: page,
          limit: limit,
          color: color,
        },
      });
      return response;
    },
    select: (response) => {
      // const processedDocs = mapUserData(response.data.message.docs);
      return {
        docs: response.data.message.docs,
        dataInfo: {
          totalDocs: response.data.message.totalDocs,
          limit: response.data.message.limit,
          totalPages: response.data.message.totalPages,
          page: response.data.message.page,
          hasPrevPage: response.data.message.hasPrevPage,
          hasNextPage: response.data.message.hasNextPage,
        },
      };
    },
  });
};

export const useAddFabricData = (closeCreateFabricDialog: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/bahan/add",
        method: HttpMethod.POST,
        data,
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menyimpan data",
        description: response.data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["fabric"] });
      closeCreateFabricDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};

export const useUpdateFabricData = (
  fabricId: string | undefined,
  closeUserDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/bahan/add-stock",
        method: HttpMethod.POST,
        params: { fabricid: fabricId },
        data,
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil mengubah data",
        description: response.data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["fabric"] });
      closeUserDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};

export const useDeleteFabricData = (
  fabricId: string | undefined,
  closeDeleteFabricDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        path: "/bahan/delete",
        method: HttpMethod.DELETE,
        params: { fabricid: fabricId },
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menghapus data",
        description: response.data.message,
      });
      closeDeleteFabricDialog();
      queryClient.invalidateQueries({ queryKey: ["fabric"] });
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};
