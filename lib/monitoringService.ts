import { apiRequest, HttpMethod } from "./apiRequest";

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
