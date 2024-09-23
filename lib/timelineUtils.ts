import {
  CustomerData,
  TransformedData,
} from "@/types/timeline/timeline-response";

export const addTotalData = (data: CustomerData[]): TransformedData[] =>
  data.map((item: any) => {
    const total = item.data.reduce(
      (sum: number, current: any) => sum + (current.jumlah || 0),
      0,
    );
    return { ...item, total };
  });
