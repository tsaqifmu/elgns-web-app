import React, { FC } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ButtonPendingProps {
  isPending: boolean;
  title: string;
  className?: string;
  size?: "default" | "modalTable" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "link"
    | "default"
    | "teal"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const ButtonPending: FC<ButtonPendingProps> = ({
  isPending,
  title,
  className,
  variant,
  size,
}) => {
  return (
    <Button
      type="submit"
      className={className}
      disabled={isPending}
      size={size}
      variant={variant}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Tunggu sebentar...
        </>
      ) : (
        title
      )}
    </Button>
  );
};

export default ButtonPending;
