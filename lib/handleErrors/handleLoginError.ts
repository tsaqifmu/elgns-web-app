import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/schemas/loginSchema";
import { handleError } from "./handleError";

type LoginValues = z.infer<typeof loginSchema>;
type Toast = ReturnType<typeof useToast>["toast"];

interface ErrorResponse {
  message?: string;
}

export const handleLoginError = (
  error: unknown,
  reset: (values?: Partial<LoginValues>) => void,
  values: LoginValues,
  toast: Toast,
): void => {
  const responseData: ErrorResponse = (error as any)?.response?.data || {};

  const showToastAndReset = (
    title: string,
    description: string,
    resetValues: Partial<LoginValues>,
  ) => {
    toast({
      variant: "destructive",
      title,
      description,
    });
    reset(resetValues);
  };

  switch (responseData.message) {
    case "User not found":
      showToastAndReset(
        "Akun tidak ditemukan",
        "Isi email dan password dengan benar",
        { username: "", password: "" },
      );
      break;

    case "Incorrect password":
      showToastAndReset(
        "Password yang anda masukkan salah",
        "Masukkan password dengan benar",
        { username: values.username, password: "" },
      );
      break;

    default:
      handleError(error as any, toast);
      break;
  }
};
