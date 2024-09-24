import { ReactNode } from "react";
import ContainerPage from "@/components/dashboard/container-page";
import NavBar from "@/components/dashboard/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <ContainerPage className="font-oswald">{children}</ContainerPage>;
    </>
  );
};

export default layout;
