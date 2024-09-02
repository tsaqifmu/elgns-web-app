import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

//! Nyoba langsung dikasih PY-35px

const ContainerPage: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className="flexCenter w-full py-9">
      <div
        className={cn(
          "h-full w-full px-4 md:px-14 lg:px-12 xl:max-w-7xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerPage;
