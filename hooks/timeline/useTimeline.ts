import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";

export const uesFetchTimelineData = () => {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: async () => {
      const { data } = await apiRequest({
        path: "/production/calendar",
        method: HttpMethod.GET,
      });
      return data;
    },
    select: (response) => response.message,
  });
};
