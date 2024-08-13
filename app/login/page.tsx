"use client";

import { z } from "zod";
import { FC, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";
import axios, { isCancel, AxiosError } from "axios";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import EmailField from "@/components/login/form-email-input";
import PasswordField from "@/components/login/form-password-input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ApiRequest, HttpMethod } from "@/config/ApiRequest";
import axiosInstance from "@/lib/axiosInstance";
import { handleSubmitError } from "@/lib/handleAxiosError";

const Login: FC = () => {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const { mutate: sendLoginData, isPending } = useMutation({
  //   mutationFn: async (data: any) => {
  //     const response = await ApiRequest({
  //       path: "/auth/signin",
  //       method: HttpMethod.POST,
  //       data,
  //     });
  //     return response;
  //   },
  //   onSuccess: (response) => {
  //     console.log(response);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // sendLoginData(data);

    const payload = {
      email: data.username,
      password: data.password,
    };

    console.log(payload);
    try {
      const { data } = await axiosInstance.post("/auth/signin", payload);
      // localStorage.setItem("accessToken", data.data.accessToken);
      console.log(data);
      // router.push("/beranda");
    } catch (error) {
      console.log(error);
      handleSubmitError(error as AxiosError, form.reset, data, toast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
        <EmailField form={form} />
        <PasswordField form={form} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tunggu sebentar...
            </>
          ) : (
            "LOGIN"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Login;
