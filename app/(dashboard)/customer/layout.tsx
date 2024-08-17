import { ReactNode } from "react";
import ContainerPage from "@/components/dashboard/container-page";

const layout = ({ children }: { children: ReactNode }) => {
  return <ContainerPage>{children}</ContainerPage>;
};

export default layout;
