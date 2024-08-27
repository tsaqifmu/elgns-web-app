"use client";

import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomerDialogProvider } from "@/contexts/CustomerDialogContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerDialogProvider>{children}</CustomerDialogProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
