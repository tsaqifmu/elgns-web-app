import Image from "next/image";
import { dateIdFormat } from "@/hooks/useCustomers";
import { useFetchCardBoard } from "@/hooks/useMonitoring";

import IconCDR from "@/public/icons/table/cdr.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { ProductionData, Task } from "@/types/monitoring/task";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditing,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="card-item min-h-24 rounded-md bg-yellow-500 p-2 opacity-30 shadow-md transition duration-200 hover:cursor-grab hover:shadow-xl"
      />
    );
  }

  const { noInvoice, jumlah, desainImgUrl, tglKeluar, tglMasuk } =
    task.productionData ?? {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex cursor-grab flex-col space-y-[5px] rounded-md border-2 border-gray-400 bg-gray-100 p-[10px]"
    >
      <div className="flex flex-row-reverse items-center justify-between uppercase">
        <h4 className="text-xs font-normal">
          {dateIdFormat(task.deadlineCurrentBoard)}
        </h4>
        <div className="rounded bg-destructive px-[5px] py-[2px] text-xs font-normal text-white">
          wip
        </div>
      </div>
      <Image
        src={`http://baru.azizfath.com:4040/data/${desainImgUrl}`}
        alt="Kaos"
        width={160}
        height={77}
        className="h-[76px] rounded-md border border-gray-400 object-cover"
      />
      <div className="flex justify-between text-xs font-normal uppercase">
        <p className="text-teal">{dateIdFormat(tglMasuk ?? "")}</p>
        <p className="text-yellow-500">{dateIdFormat(tglKeluar ?? "")}</p>
      </div>
      <div className="flex flex-col space-y-[3px] text-xs font-normal uppercase">
        <h4>{noInvoice}</h4>
        <p className="text-gray-400">{jumlah} pcs</p>
        <div className="flex space-x-[5px]">
          <IconImage className="h-[14px] w-[14px] text-teal" />
          <IconCDR className="h-[14px] w-[14px] text-teal" />
          <IconDownload className="h-[14px] w-[14px] text-teal" />
        </div>
      </div>
    </div>
  );
};
