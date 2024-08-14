import { AxiosError } from "axios";

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
