"use client";

import { z } from "zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/hooks/useLogin";
import { loginSchema } from "@/schemas/loginSchema";

import { Form } from "@/components/ui/form";
import ButtonPending from "@/components/button-pending";
import EmailField from "@/components/login/form-email-input";
import PasswordField from "@/components/login/form-password-input";

const Login: FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: sendLoginData, isPending } = useLogin(form);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const payload = {
      name: data.username,
      password: data.password,
    };
    sendLoginData(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bggren w-80 space-y-6"
      >
        <EmailField form={form} />
        <PasswordField form={form} />

        <ButtonPending isPending={isPending} title="LOGIN" className="w-full" />
      </form>
    </Form>
  );
};

export default Login;
