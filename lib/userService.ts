import { User } from "@/types/auth/user";
import { AxiosResponse } from "axios";
import { apiRequest, HttpMethod } from "./apiRequest";

export const getUser = async () => {
  const response: AxiosResponse<any> = await apiRequest({
    path: "/auth/me",
    method: HttpMethod.GET,
  });

  return response.data.data;
};
