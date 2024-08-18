import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="flex flex-col items-end space-y-2">
      <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
      <Skeleton className="h-10 w-full rounded-xl bg-gray-200" />
      <Skeleton className="h-10 w-full rounded-xl bg-gray-200" />
      <Skeleton className="h-10 w-full rounded-xl bg-gray-200" />
      <Skeleton className="h-5 w-1/6 rounded-xl bg-gray-200" />
    </div>
  );
};

export default SkeletonTable;
