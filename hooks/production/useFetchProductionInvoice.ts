import { useQuery } from "@tanstack/react-query";

import { Invoice } from "@/types/production/invoice/invoice";
import { getProductionInvoiceMenu } from "@/lib/productionService";

import {
  InvoiceResponse,
  mapInvoiceResponse,
} from "@/types/production/invoice/invoice-response";

export const useFetchProductionInvoice = (productionId: string | undefined) => {
  return useQuery({
    queryKey: ["productionInvoice", productionId],
    queryFn: async (): Promise<InvoiceResponse> => {
      const response = await getProductionInvoiceMenu(productionId);
      return response;
    },
    select: (response): Invoice => {
      return mapInvoiceResponse(response);
    },
  });
};
