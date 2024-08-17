import { toast } from "@/components/ui/use-toast";
import { ApiRequest, HttpMethod } from "@/config/ApiRequest";
import { handleLoginError } from "@/lib/handleErrors/handleLoginError";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

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
      const response = await ApiRequest({
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
