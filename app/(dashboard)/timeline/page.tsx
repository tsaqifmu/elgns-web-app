"use client";

import React, { useMemo } from "react";
import { dateIdFormat } from "@/lib/dateUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { uesFetchTimelineData } from "@/hooks/timeline/useTimeline";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";

// Define Customer and DateData interfaces
interface CustomerData {
  alamatKabupaten: string;
  custName: string;
  jumlah: number;
  noInvoice: string;
  tglMasuk: string;
  _id: string;
}

interface DateData {
  data: CustomerData[];
  date: string;
}

// Extract components for better readability and maintainability
const CustomerTooltip = ({ customer }: { customer: CustomerData }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{ width: `${calculateWidth(customer.jumlah)}%` }}
          className="flex h-full flex-col justify-end bg-teal px-[10px] py-[5px]"
        >
          <h4>{customer.jumlah}</h4>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" align="start">
        <div className="space-y-3 text-xs uppercase">
          <div>
            <h4>{customer.noInvoice}</h4>
            <h4 className="text-gray-400">{dateIdFormat(customer.tglMasuk)}</h4>
          </div>
          <div>
            <h4>{customer.custName}</h4>
            <h4>TOTAL: {customer.jumlah}</h4>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const DateColumn = ({ dateData }: { dateData: DateData }) => {
  return (
    <div className="relative flex h-[120px] w-full bg-gray-600">
      <h3 className="absolute px-[10px] py-[5px]">{dateData.date}</h3>
      {dateData.data.length > 0 &&
        dateData.data.map((customer) => (
          <CustomerTooltip key={customer._id} customer={customer} />
        ))}
    </div>
  );
};

// Utility function for width calculation
const calculateWidth = (total: number): number => {
  return total >= 35 ? 100 : Math.round((total / 35) * 100);
};

const TimelinePage: React.FC = () => {
  const { data, isError, isLoading, error } = uesFetchTimelineData();

  // Handle loading and error states
  const renderContent = () => {
    if (isLoading) return <SkeletonTable />;
    if (isError) return <ErrorLoadData error={error} />;
    if (data)
      return (
        <TooltipProvider delayDuration={500}>
          <div className="grid grid-cols-7 gap-1 text-white">
            {data.data?.map((dateData: DateData) => (
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
          {data.dateHeader}
        </h1>
      </header>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default TimelinePage;
