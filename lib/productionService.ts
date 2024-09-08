import { DetailResponse } from "@/types/production/detail/detail-response";
import { apiRequest, HttpMethod } from "./apiRequest";
import { InvoiceResponse } from "@/types/production/invoice/invoice-response";
import { OverviewResponse } from "@/types/production/overview/overview-response";
import { AxiosResponse } from "axios";
import {
  IDetail,
  mapDetailToDetailToSend,
} from "@/types/production/detail/detail";
import {
  Invoice,
  mapInvoiceToInvoiceToSend,
} from "@/types/production/invoice/invoice";
import { z } from "zod";
import { productionOverviewSchema } from "@/schemas/productionOverviewSchema";
import { OverviewToSend } from "@/types/production/overview/overview-to-send";
import { InvoiceTableTotal } from "@/types/production/invoice/invoice-table-total";
import { InvoiceTableItem } from "@/types/production/invoice/invoice-table-item";
import { MonitoringOverviewResponse } from "@/types/monitoring/overview/monitoring-overview-response";

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const getProductions = async (page: string, limit: string) => {
  const response = await apiRequest({
    path: "/production/list",
    method: HttpMethod.GET,
    params: {
      page: page,
      limit: limit,
    },
  });
  return response;
};

export const deleteProduction = async (productionId: string | undefined) => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const response = await apiRequest({
    path: "/production/delete",
    method: HttpMethod.DELETE,
    params: { productionid: productionId },
  });
  return response;
};

// ------------------------------ PRODUCTION OVERVIEW ------------------------------

export const getProductionOverview = async (
  productionId: string | undefined,
): Promise<OverviewResponse> => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const response: AxiosResponse<OverviewResponse> = await apiRequest({
    path: "/production/get-overview",
    method: HttpMethod.GET,
    params: {
      productionid: productionId,
    },
  });
  return response.data;
};

export const updateProductionOverview = async (
  productionId: string | undefined,
  overview: z.infer<typeof productionOverviewSchema>,
) => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const uploadFile = async (file: File, resourceType: "img" | "cdr") => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiRequest({
      path: `/production/add-assets/${resourceType}`,
      method: HttpMethod.POST,
      params: { productionid: productionId },
      data: formData,
    });

    return response.data;
  };

  const { invoice, name, notes, phoneNumber, type, imageFile, cdrFile } =
    overview;

  const overviewToSend: OverviewToSend = {
    custName: name,
    noHp: phoneNumber,
    catatan: notes,
    jenis: type,
    noInvoice: invoice,
  };

  const updateOverview = await apiRequest({
    path: "/production/add-overview",
    method: HttpMethod.POST,
    params: {
      productionid: productionId,
    },
    data: overviewToSend,
  });

  const uploadImage = (imageFile: File) => uploadFile(imageFile, "img");
  const uploadCDR = (cdrFile: File) => uploadFile(cdrFile, "cdr");

  console.log("asdfkjasdfk");
  console.log(!imageFile);

  return Promise.all([
    updateOverview,
    overview.imageFile && uploadImage(imageFile!),
    overview.cdrFile && uploadCDR(cdrFile!),
  ]);
};

// ------------------------------ PRODUCTION DETAIL ------------------------------

export const getProductionDetailMenu = async (
  productionId: string | undefined,
): Promise<DetailResponse> => {
  if (!productionId) return Promise.reject(new Error("id ga ada bro"));

  const response: AxiosResponse<DetailResponse> = await apiRequest({
    path: "/production/get-detail",
    method: HttpMethod.GET,
    params: {
      productionid: productionId,
    },
  });

  return response.data;
};

export const updateProductionDetail = async (
  productionId: string | undefined,
  detail: IDetail,
) => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const data = mapDetailToDetailToSend(detail);
  const response = await apiRequest({
    path: "/production/add-detail",
    method: HttpMethod.POST,
    params: {
      productionid: productionId,
    },
    data,
  });

  return response;
};

// ------------------------------ PRODUCTION INVOICE ------------------------------

export const getProductionInvoiceMenu = async (
  productionId: string | undefined,
): Promise<InvoiceResponse> => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const response: AxiosResponse<InvoiceResponse> = await apiRequest({
    path: "/production/get-invoice",
    method: HttpMethod.GET,
    params: {
      productionid: productionId,
    },
  });

  return response.data;
};

export const updateProductionInvoice = async (
  productionId: string | undefined,
  invoice: Invoice,
) => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const data = mapInvoiceToInvoiceToSend(invoice);
  const response = await apiRequest({
    path: "/production/add-invoice",
    method: HttpMethod.POST,
    params: {
      productionid: productionId,
    },
    data,
  });

  return response;
};

// ------------------------------ MONITORING OVERVIEW ------------------------------

export const getMonitoringOverview = async (
  productionId: string | undefined,
): Promise<MonitoringOverviewResponse> => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const response: AxiosResponse<MonitoringOverviewResponse> = await apiRequest({
    path: "/monitoring/get-card-overview",
    method: HttpMethod.GET,
    params: {
      productionid: productionId,
    },
  });
  return response.data;
};
