import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

interface dataInfoProps {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export function DataTablePagination<TData>({
  dataInfo,
}: {
  dataInfo: dataInfoProps;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [pageIndex, setPageIndex] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [pageSize, setPageSize] = useState<number>(
    parseInt(searchParams.get("pageSize") || "10", 10),
  );

  const { hasPrevPage, hasNextPage, totalPages, page } = dataInfo;

  const updateUrlParams = (newPageIndex: number, newPageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPageIndex.toString());
    params.set("pageSize", newPageSize.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pageSize?.toString()}
            onValueChange={(value) => {
              const newSize = parseInt(value, 10);
              setPageSize(newSize);
              updateUrlParams(pageIndex, newSize);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Halaman {page} dari {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(1);
              updateUrlParams(0, pageSize);
            }}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newPageIndex = Math.max(1, pageIndex - 1);
              setPageIndex(newPageIndex);
              updateUrlParams(newPageIndex, pageSize);
            }}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newPageIndex = Math.min(totalPages, pageIndex + 1);
              setPageIndex(newPageIndex);
              updateUrlParams(newPageIndex, pageSize);
            }}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setPageIndex(totalPages);
              updateUrlParams(totalPages, pageSize);
            }}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
