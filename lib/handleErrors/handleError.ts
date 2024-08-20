import { AxiosError } from "axios";
// import { useToast } from "@/components/ui/use-toast";

interface CustomErrorResponse {
  error: string;
  message: string;
}

export function handleError(
  error: unknown,
  toast: (params: {
    variant: "default" | "destructive" | null;
    title: string;
    description: string;
  }) => void,
) {
  const variant: "default" | "destructive" | null = "destructive"; // Menggunakan tipe variant yang sesuai

  if (error instanceof AxiosError) {
    const { response, message } = error as AxiosError<CustomErrorResponse>;
    if (response) {
      const { data, status, statusText } = response;
      const errorMessage =
        data?.message || `Kesalahan tidak diketahui: ${status} ${statusText}`;

      toast({
        variant,
        title: "Kesalahan",
        description: errorMessage,
      });
    } else {
      toast({
        variant,
        title: "Kesalahan Permintaan",
        description: message,
      });
    }
  } else {
    toast({
      variant,
      title: "Kesalahan Lainnya",
      description: String(
        (error as CustomErrorResponse).message || "Terjadi kesalahan",
      ),
    });
  }
}
