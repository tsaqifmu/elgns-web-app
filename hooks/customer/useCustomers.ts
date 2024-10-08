"use client";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { toast } from "@/components/ui/use-toast";
import { DataCustomer } from "@/components/dashboard/customer/columns";
import { handleArrayError } from "@/lib/handleErrors/handleArrayError";
import { dateIdFormat } from "@/lib/dateUtils";

interface ApiResponse<ItemType> {
  data: {
    message: {
      docs: ItemType[];
      totalDocs: number;
      limit: number;
      totalPages: number;
      page: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
    };
  };
}

// Define the customer data structure
interface CustomerData {
  _id: string;
  date: string;
  name: string;
  noHp: string;
  brand: string;
  alamatKabupaten: string;
  status: string;
  info: string;
}

interface CustomerQueryData {
  docs: DataCustomer[];
  dataInfo: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

const mapCustomerData = (data: CustomerData[]): DataCustomer[] =>
  data.map((data) => ({
    id: data._id,
    dateOfEntry: dateIdFormat(data?.date),
    name: data?.name?.toUpperCase(),
    phoneNumber: data.noHp,
    brand: data.brand,
    regency: data?.alamatKabupaten?.toUpperCase(),
    status: data?.status?.toUpperCase(),
    statusDescription: data?.info,
  }));

export const useFetchCustomerData = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString() || "1";
  const limit = searchParams.get("pageSize")?.toString() || "5";

  return useQuery({
    queryKey: ["customers", page, limit],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/customer/list",
        method: HttpMethod.GET,
        params: {
          alphabet: "",
          year: "2024",
          month: "",
          week: "",
          name: "",
          status: "",
          page: page,
          limit: limit,
        },
      });
      return response;
    },
    select: (response) => {
      const processedDocs = mapCustomerData(response.data.message.docs);
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

export const useAddCustomerData = (closeCustomerDialog: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/customer/add",
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
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      closeCustomerDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};

export const useUpdateCustomerData = (
  customerId: string | undefined,
  closeCustomerDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/customer/update",
        method: HttpMethod.POST,
        params: { customerid: customerId },
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
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      closeCustomerDialog();
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};

export const useDeleteCustomerData = (
  customerId: string | undefined,
  closeCustomerDialog: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        path: "/customer/delete",
        method: HttpMethod.DELETE,
        params: { customerid: customerId },
      });
      return response;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Berhasil menghapus data",
        description: response.data.message,
      });
      closeCustomerDialog();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      handleArrayError(error, toast);
      console.error(error);
    },
  });
};
