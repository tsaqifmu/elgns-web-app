import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { handleLoginError } from "@/lib/handleErrors/handleLoginError";

import { toast } from "@/components/ui/use-toast";

export const useLogin = (
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    any,
    undefined
  >,
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest({
        path: "/auth/signin",
        method: HttpMethod.POST,
        data,
      });
      return response;
    },
    onSuccess: (response) => {
      Cookies.set("accessToken", response.data.data.accessToken, {
        expires: 7,
        secure: true,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      handleLoginError(
        error as AxiosError,
        form.reset,
        form.getValues(),
        toast,
      );
      console.log(error);
    },
  });
};
