import { Icons } from "@/public/icons";
import React, { Children } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Icons.Logo />
        <div className="flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
