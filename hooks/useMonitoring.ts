"use client";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";

export const useFetchBoardList = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await apiRequest({
        path: "/monitoring/board/list",
        method: HttpMethod.GET,
      });
      return data;
    },
    select: (response) => {
      return response.message;
    },
  });
};