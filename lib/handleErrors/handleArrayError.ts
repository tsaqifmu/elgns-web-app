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

export function handleArrayError(
  error: unknown,
  toast: (params: {
    variant: string;
    title: string;
    description: string;
  }) => void,
) {
  if (error instanceof AxiosError) {
    const { response, message } = error as AxiosError<ErrorResponse>;
    if (response) {
      const { data, status, statusText } = response;
      const errorMessage =
        data?.message[0]?.msg ||
        `Kesalahan tidak diketahui: ${status} ${statusText}`;

      toast({
        variant: "destructive",
        title: "Kesalahan",
        description: errorMessage,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Kesalahan Permintaan",
        description: message,
      });
    }
  } else {
    toast({
      variant: "destructive",
      title: "Kesalahan Lainnya",
      description: String(
        (error as { message: string }).message || "Terjadi kesalahan",
      ),
    });
  }
}
