import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const uesFetchTimelineData = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  return useQuery({
    queryKey: ["timeline", month],
    queryFn: async () => {
      const { data } = await apiRequest({
        path: "/production/calendar",
        method: HttpMethod.GET,
        params: { month: Number(month), year: "2024" },
      });
      return data;
    },
    select: (response) => response.message,
  });
};
