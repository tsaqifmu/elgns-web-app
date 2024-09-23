import { FC } from "react";
import { cn } from "@/lib/utils";
import { dateIdFormat } from "@/lib/dateUtils";
import {
  CustomerData,
  TransformedData,
} from "@/types/timeline/timeline-response";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomerTooltipProps {
  customer: CustomerData;
  color: string;
}

// Utility function for width calculation
const calculateWidth = (total: number): number => {
  return total >= 35 ? 100 : Math.round((total / 35) * 100);
};

const CustomerTooltip: FC<CustomerTooltipProps> = ({ customer, color }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{ width: `${calculateWidth(customer.jumlah)}%` }}
          className={cn(
            "flex h-full flex-col justify-end px-[10px] py-[5px]",
            color,
          )}
        >
          {/* <h4>{customer.jumlah}</h4> */}
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

export const DateColumn = ({ dateData }: { dateData: TransformedData }) => {
  const COLORS = [
    "bg-teal",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-emerald-500",
  ];

  // warna text pada jumlah akan merah jika overload
  const overloadColor = dateData.total > 35 && "text-destructive";

  return (
    <div className="relative flex h-[120px] w-full bg-gray-600">
      <h3 className="absolute px-[10px] py-[5px]">{dateData.date}</h3>
      <h3 className={cn("absolute bottom-0 px-[10px] py-[5px]", overloadColor)}>
        {dateData.total}
      </h3>
      {dateData.data.length > 0 &&
        dateData.data.map((customer, index) => (
          <CustomerTooltip
            key={customer._id}
            customer={customer}
            color={COLORS[index % COLORS.length]}
          />
        ))}
    </div>
  );
};
