import NavBar from "@/components/dashboard/navbar";
import { Icons } from "@/public/icons";
import { Children } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
