"use client";

import Cookies from "js-cookie";
import { z } from "zod";
import { FC, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";
import { AxiosError } from "axios";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import EmailField from "@/components/login/form-email-input";
import PasswordField from "@/components/login/form-password-input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ApiRequest, HttpMethod } from "@/config/ApiRequest";
import { handleLoginError } from "@/lib/handleErrors/handleLoginError";

const Login: FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: sendLoginData, isPending } = useMutation({
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
        secure: false,
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

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const payload = {
      email: data.username,
      password: data.password,
    };
    sendLoginData(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
        <EmailField form={form} />
        <PasswordField form={form} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
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
