import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";

import { addTotalData } from "@/lib/timelineUtils";

export const useFetchTimelineData = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  return useQuery({
    queryKey: ["timeline", month],
    queryFn: async () => {
      const payload: any = {
        path: "/production/calendar",
        method: HttpMethod.GET,
      };
      if (month) payload.params = { month: Number(month) ?? "", year: "2024" };

      const { data } = await apiRequest(payload);
      return data;
    },
    select: (response) => {
      const transformedData = addTotalData(response.message.data);
      response.message.data = transformedData;
      return response.message;
    },
  });
};
