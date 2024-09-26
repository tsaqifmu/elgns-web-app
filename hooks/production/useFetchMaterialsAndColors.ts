import { useQuery } from "@tanstack/react-query";

import {
  getMaterialNameColors,
  getMaterialNames,
} from "@/lib/productionService";
import { MaterialAndColor } from "@/types/production/detail/material-and-color";

export const useFetchMaterialsAndColors = () => {
  return useQuery({
    queryKey: ["materialAndColors"],
    queryFn: async (): Promise<MaterialAndColor[]> => {
      const materialNames = await getMaterialNames();

      let materialsAndColors = [];
      for (const materialName of materialNames) {
        const colors = await getMaterialNameColors(materialName);
        materialsAndColors.push({ materialName, colors });
      }

      return materialsAndColors;
    },
  });
};
