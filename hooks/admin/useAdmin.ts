"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { UserDocument } from "@/types/admin/user-data-response";

import { toast } from "@/components/ui/use-toast";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";

const mapUserData = (data: UserDocument[]) =>
  data.map((data) => ({
    id: data?._id,
    name: data?.name.toUpperCase(),
    email: data?.email.toUpperCase(),
    phoneNumber: data?.noHp,
    role: data?.role.toUpperCase(),
  }));

export const useFetchUserData = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString() || "1";
  // const limit = searchParams.get("pageSize")?.toString() || "5";

  return useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/admin/user/list",
        method: HttpMethod.GET,
        params: {
          // alphabet: "",
          // year: "2024",
          // month: "",
          // week: "",
          // name: "",
          // status: "",
          page: page,
          // limit: limit,
        },
      });
      return response;
    },
    select: (response) => {
      const processedDocs = mapUserData(response.data.message.docs);
      return {
        docs: processedDocs,
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

export const useAddUserData = (closeCreateAdminDialog: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/admin/user/add",
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeCreateAdminDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};

export const useDeleteUserData = (
  userId: string | undefined,
  closeUserDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        path: "/admin/user/delete",
        method: HttpMethod.DELETE,
        params: { userid: userId },
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menghapus data",
        description: response.data.message,
      });
      closeUserDialog();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};
