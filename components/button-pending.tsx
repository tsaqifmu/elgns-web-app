import React, { FC } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ButtonPendingProps {
  isPending: boolean;
  title: string;
}

const ButtonPending: FC<ButtonPendingProps> = ({ isPending, title }) => {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
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
