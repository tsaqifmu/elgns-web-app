import { AxiosError } from "axios";

interface CustomErrorResponse {
  error: string;
  message: string;
}

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
