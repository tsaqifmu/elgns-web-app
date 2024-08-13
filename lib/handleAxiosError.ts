import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/schemas/loginSchema";
import { AxiosError } from "axios";
import { z } from "zod";

interface ErrorResponse {
  error: boolean;
  message: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
}

interface CustomErrorResponse {
  error: string;
  message: string;
}
// for array error
export function handleArrayError(error: any, toast: (params: any) => void) {
  if (error instanceof AxiosError) {
    const axiosError: AxiosError<ErrorResponse> = error;
    if (axiosError.response) {
      const responseData = axiosError.response.data;
      if (responseData.error && responseData.message) {
        const errorMessage = responseData.message[0].msg;
        toast({
          variant: "destructive",
          title: "Kesalahan",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Kesalahan",
          description: `Kesalahan tidak diketahui: ${axiosError.response.status} ${axiosError.response.statusText}`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Kesalahan Permintaan",
        description: axiosError.message,
      });
    }
  } else {
    toast({
      variant: "destructive",
      title: "Kesalahan Lainnya",
      description: error.message.toString(),
    });
  }
}

// for non array error
export function handleError(
  error: CustomErrorResponse,
  toast: (params: any) => void,
) {
  if (error instanceof AxiosError) {
    const axiosError: AxiosError<CustomErrorResponse> = error;
    if (axiosError.response) {
      const responseData = axiosError.response.data;
      if (responseData.error && responseData.message) {
        const errorMessage = responseData.message;

        toast({
          variant: "destructive",
          title: "Kesalahan",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Kesalahan",
          description: `Kesalahan tidak diketahui: ${axiosError.response.status} ${axiosError.response.statusText}`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Kesalahan Permintaan",
        description: axiosError.message,
      });
    }
  } else {
    toast({
      variant: "destructive",
      title: "Kesalahan Lainnya",
      description: error.message.toString(),
    });
  }
}

export const handleSubmitError = (
  error: any,
  reset: (values?: Partial<z.infer<typeof loginSchema>>) => void,
  values: z.infer<typeof loginSchema>,
  toast: ReturnType<typeof useToast>["toast"],
) => {
  const responseData: { message?: string } = error.response?.data || {};

  switch (responseData.message) {
    case "User not found":
      toast({
        variant: "destructive",
        title: "Akun tidak ditemukan",
        description: "Isi email dan password dengan benar",
      });
      // reset({ email: "", password: "" });
      break;

    case "Incorrect password":
      toast({
        variant: "destructive",
        title: "Password yang anda masukkan salah",
        description: "Masukkan dengan password dengan benar",
      });
      // reset({ email: values.email, password: "" });
      break;

    default:
      handleError(error, toast);
      break;
  }
};
