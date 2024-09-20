import { MonitoringOverviewResponse } from "@/types/monitoring/overview/monitoring-overview-response";
import { apiRequest, HttpMethod } from "./apiRequest";
import { AxiosResponse } from "axios";
import { monitoringOverviewSchema } from "@/schemas/monitoringOverviewSchema";
import { MonitoringTimelineResponse } from "@/types/monitoring/timeline/monitoring-timeline-response";
import { z } from "zod";
import { Task } from "@/types/monitoring/task";
import { ColumnItem } from "@/types/monitoring/column-item";

export const updateTaskPosition = async (
  taskId: string | undefined,
  columnId: string,
) => {
  const response = await apiRequest({
    path: `/monitoring/move-card`,
    method: HttpMethod.POST,
    params: { cardid: taskId, targetboardid: columnId },
  });

  return response.data;
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

export const getBoardName = async (cardId?: string): Promise<string> => {
  const { data } = await apiRequest({
    path: "/monitoring/board/list",
    method: HttpMethod.GET,
  });
  const tasks = data.message.cards as Task[];
  const boards = data.message.boards as ColumnItem[];
  const boardId = tasks.find((c) => c._id === cardId)?.currentBoardId;
  const boardName = boards.find((c) => c.id === boardId)?.name ?? "";

  return boardName;
};

export const updateMonitoringOverview = async (
  productionId: string | undefined,
  overview: z.infer<typeof monitoringOverviewSchema>,
  cardId: string | undefined,
  boardName: string,
) => {
  if (!productionId) return Promise.reject(new Error("production id kosong"));

  const uploadFile = async (file: File, resourceType: "img" | "cdr") => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiRequest({
      path: `/monitoring/add-assets/${resourceType}`,
      method: HttpMethod.POST,
      params: { productionid: productionId },
      data: formData,
    });

    return response.data;
  };

  const uploadProof = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiRequest({
      path: `/monitoring/add-proof`,
      method: HttpMethod.POST,
      params: { cardid: cardId, currentboardname: boardName },
      data: formData,
    });

    return response.data;
  };

  const { imageFile, cdrFile, proofFile } = overview;

  const overviewToSend = {
    tglMasuk: overview.dateIn.toISOString(),
    tglKeluar: overview.dateOut.toISOString(),
  };

  const updateOverview = await apiRequest({
    path: "/monitoring/add-card-overview",
    method: HttpMethod.POST,
    params: {
      productionid: productionId,
    },
    data: overviewToSend,
  });

  return Promise.all([
    updateOverview,
    imageFile && uploadFile(imageFile, "img"),
    cdrFile && uploadFile(cdrFile, "cdr"),
    proofFile && uploadProof(proofFile),
  ]);
};

export const getMonitoringTimeline = async (cardId: string | undefined) => {
  if (!cardId) return Promise.reject(new Error("card id kosong"));
  console.log("card:", cardId);
  const response: AxiosResponse<MonitoringTimelineResponse> = await apiRequest({
    path: "/monitoring/list-proof",
    method: HttpMethod.GET,
    params: {
      cardid: cardId,
    },
  });
  return response.data;
};
