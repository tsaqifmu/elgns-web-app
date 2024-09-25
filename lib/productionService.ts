import { DetailResponse } from "@/types/production/detail/detail-response";
import { apiRequest, HttpMethod } from "./apiRequest";
import { InvoiceResponse } from "@/types/production/invoice/invoice-response";
import { ProductionOverviewResponse } from "@/types/production/overview/production-overview-response";
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
import { ProductionOverviewToSend } from "@/types/production/overview/production-overview-to-send";

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
): Promise<ProductionOverviewResponse> => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const response: AxiosResponse<ProductionOverviewResponse> = await apiRequest({
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

  const { name, notes, phoneNumber, type, imageFile, cdrFile } = overview;

  const overviewToSend: ProductionOverviewToSend = {
    custName: name,
    noHp: phoneNumber,
    catatan: notes,
    jenis: type,
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

// ------------ BAHAN ------------
export const getMaterialNames = async (): Promise<string[]> => {
  const response = await apiRequest({
    path: "/bahan/list/name",
    method: HttpMethod.GET,
  });

  return response.data.message.data;
};

export const getMaterialNameColors = async (
  materialName: string,
): Promise<string[]> => {
  const response = await apiRequest({
    path: "/bahan/list/color",
    method: HttpMethod.GET,
    params: {
      fabricname: materialName,
    },
  });

  return response.data.message.data;
};
