import React from "react";
import Link from "next/link";

import { formatToIndonesianDate } from "@/lib/dateUtils";
import { MonitoringTimelineItemResponse } from "@/types/monitoring/timeline/monitoring-timeline-item-response";
import IconImage from "@/public/icons/table/image.svg";

interface MonitoringTimelineItemProps {
  item: MonitoringTimelineItemResponse;
}

export default function MonitoringTimelineItem({
  item,
}: MonitoringTimelineItemProps) {
  return (
    <div className="my-2 flex w-full justify-between">
      <div className="flex flex-1 items-center">
        <h1 className="font-medium uppercase">{item.boardOriginName}</h1>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-sm font-thin uppercase">
          {formatToIndonesianDate(item.assignDate)}
          {" - "}
          {formatToIndonesianDate(item.uploadDate)}
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Link
          href={process.env.NEXT_PUBLIC_API_BASE_URL + "/data/" + item.urlImg}
          target="_blank"
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          <IconImage className="h-5 w-5 cursor-pointer text-black" />
        </Link>
      </div>
    </div>
  );
}
