import { MessageSquareWarning } from "lucide-react";
import React from "react";

const ErrorLoadData = ({ error }: { error: any }) => {
  return (
    <div className="flex flex-col items-center justify-center text-destructive">
      <MessageSquareWarning className="h-20 w-20" />
      <p className="text-2xl">
        Terjadi kesalahan saat memuat data. Silakan coba lagi.
      </p>
      <p>{error.toString()}</p>
    </div>
  );
};

export default ErrorLoadData;
