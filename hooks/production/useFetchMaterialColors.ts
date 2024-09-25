import { useQuery } from "@tanstack/react-query";

import {
  getMaterialNameColors,
  getMaterialNames,
} from "@/lib/productionService";
export const useFetchMaterialNameColors = () => {
  return useQuery({
    queryKey: ["material/name"],
    queryFn: async ({ materialName }: any): Promise<string[]> => {
      const response = await getMaterialNameColors(materialName);
      return response;
    },
  });
};
