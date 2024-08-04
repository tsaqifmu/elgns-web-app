"use client";

import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({ form }: { form: any }) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const showPassword = () => setIsShowPassword((prev) => !prev);
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-bold">PASSWORD</FormLabel>
          <FormControl>
            <div className="relative py-2">
              <Input
                placeholder="Masukkan password"
                type={isShowPassword ? "text" : "password"}
                {...field}
              />
              <Button
                variant="ghost"
                type="button"
                className="absolute right-0 top-2"
                onClick={showPassword}
              >
                {isShowPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
