import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import Cookies from "js-cookie";

const SERVICE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export enum HttpMethod {
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
  POST = "POST",
}

export const ApiRequest = async ({
  path = "",
  method,
  url = SERVICE_URL,
  params = {},
  data = {},
  providedToken = null,
  responseType = "json",
}: {
  path?: string;
  method: HttpMethod;
  url?: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  providedToken?: string | null;
  responseType?: ResponseType;
}): Promise<AxiosResponse<any>> => {
  const fullPath = `${url}${path}`;
  const activeToken = providedToken || Cookies.get("accessToken");

  if (!(method in HttpMethod)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }
  const config: AxiosRequestConfig = {
    url: fullPath,
    method: method,
    headers: {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${activeToken}`,
    },
    params: params,
    data: data,
    responseType: responseType,
  };
  return axios(config);
};
