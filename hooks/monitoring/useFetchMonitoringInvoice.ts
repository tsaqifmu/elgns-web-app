import { useQuery } from "@tanstack/react-query";

import { Invoice } from "@/types/production/invoice/invoice";
import { getMonitoringInvoiceMenu } from "@/lib/monitoringService";

import {
  InvoiceResponse,
  mapInvoiceResponse,
} from "@/types/production/invoice/invoice-response";

export const useFetchMonitoringInvoice = (productionId: string | undefined) => {
  return useQuery({
    queryKey: ["monitoringInvoice", productionId],
    queryFn: async (): Promise<InvoiceResponse> => {
      const response = await getMonitoringInvoiceMenu(productionId);
      return response;
    },
    select: (response): Invoice => {
      return mapInvoiceResponse(response);
    },
  });
};
