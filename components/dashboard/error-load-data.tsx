import { MessageSquareWarning } from "lucide-react";
import React from "react";

const ErrorLoadData = () => {
  return (
    <div className="flex flex-col items-center justify-center text-destructive">
      <MessageSquareWarning className="h-20 w-20" />
      <p className="text-xl">
        Terjadi kesalahan saat memuat data. Silakan coba lagi.
      </p>
    </div>
  );
};

export default ErrorLoadData;
