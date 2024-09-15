import Cookies from "js-cookie";
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { useRouter } from "next/router";

const SERVICE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export enum HttpMethod {
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
  POST = "POST",
}

interface ApiRequestParams {
  path?: string;
  method: HttpMethod;
  url?: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  token?: string | null;
  responseType?: ResponseType;
}

export const apiRequest = async ({
  path = "",
  method,
  url = SERVICE_URL,
  params = {},
  data = {},
}: ApiRequestParams): Promise<AxiosResponse<any>> => {
  const fullPath = `${url}${path}`;
  const activeToken = Cookies.get("accessToken");

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

    withCredentials: true,
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      // if (error.response?.status === 401) {
      //   window.location.href = "/login";
      // }
      return Promise.reject(error);
    },
  );

  return axios(config);
};
