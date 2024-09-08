"use client";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";

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

const TimelinePage = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["timeline"],
    queryFn: async () => {
      const { data } = await apiRequest({
        path: "/production/calendar",
        method: HttpMethod.GET,
      });
      return data;
    },
    select: (response) => response.message,
  });

  const calculateWidth = (total: number) => {
    if (total >= 35) return "w-[100%]";
    const percent = Math.round((total / 35) * 100);
    return `w-[${percent}%]`;
  };

  return (
    <TooltipProvider delayDuration={500}>
      <div className="grid grid-cols-7 gap-1 text-white">
        {data?.map((dateData: DateData) => {
          return (
            <>
              <div className="relative flex h-[120px] w-full bg-gray-600">
                <h3 className="absolute px-[10px] py-[5px]">{dateData.date}</h3>
                {dateData.data.length > 0 &&
                  dateData.data.map((customer: CustomerData) => {
                    console.log(calculateWidth(customer.jumlah));
                    return (
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={cn(
                              "flex h-full flex-col justify-end bg-teal px-[10px] py-[5px]",
                              calculateWidth(customer.jumlah),
                            )}
                          >
                            <h4>{customer.jumlah}</h4>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="start">
                          <div className="uppercase">
                            <h4>{customer.noInvoice}</h4>
                            <h4>{customer.tglMasuk}</h4>
                            <h4>{customer.custName}</h4>
                            <h4>{customer.jumlah}</h4>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
              </div>
            </>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default TimelinePage;
