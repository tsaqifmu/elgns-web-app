"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { UserDocument } from "@/types/admin/user-data-response";

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
    queryKey: ["customers", page],
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
