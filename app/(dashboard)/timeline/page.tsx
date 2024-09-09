"use client";

import React, { useMemo } from "react";
import { uesFetchTimelineData } from "@/hooks/timeline/useTimeline";
import { DateData } from "@/types/timeline/timeline-response";

import { TooltipProvider } from "@/components/ui/tooltip";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import SelectMonth from "@/components/dashboard/timeline/select-month";
import { DateColumn } from "@/components/dashboard/timeline/customer-tooltip";

const TimelinePage: React.FC = () => {
  const { data, isError, isLoading, error } = uesFetchTimelineData();

  // Memoize calculated data for better performance
  const timelineData = useMemo(() => data, [data]);

  // Handle loading and error states
  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (data)
      return (
        <TooltipProvider delayDuration={500}>
          <div className="grid grid-cols-7 gap-1 text-white">
            {timelineData.data?.map((dateData: DateData) => (
              <DateColumn key={dateData.date} dateData={dateData} />
            ))}
          </div>
        </TooltipProvider>
      );
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="w-10 text-3xl font-semibold lg:w-full">
          {timelineData?.dateHeader}
        </h1>
        <SelectMonth />
      </header>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default TimelinePage;
