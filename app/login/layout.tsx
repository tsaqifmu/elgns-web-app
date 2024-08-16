import React from "react";
import { Icons } from "@/public/icons";
import Cookies from "js-cookie";

const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const activeToken = Cookies.get();
  console.log(activeToken);
  return (
    <section className="h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="py-2">
          <Icons.Logo />
        </div>
        <div className="flex h-full w-full items-center justify-center font-sans">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LoginLayout;
