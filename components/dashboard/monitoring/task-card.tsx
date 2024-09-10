import Image from "next/image";

import IconCDR from "@/public/icons/table/cdr.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDialogMonitoringStore } from "@/stores/dialog-monitoring-store";
import { useShallow } from "zustand/react/shallow";
import { formatToIndonesianDate } from "@/lib/dateUtils";
import { Task } from "@/types/monitoring/task";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [openDetailMonitoringDialog, setCardMonitoringId] =
    useDialogMonitoringStore(
      useShallow((state) => [
        state.openEditMonitoringDialog,
        state.setCardMonitoringId,
      ]),
    );

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
      onClick={() => {
        if (task.productionData) {
          openDetailMonitoringDialog(task.productionData);
          setCardMonitoringId(task._id);
        } else {
          alert("Belum ada data produksi untuk card ini.");
        }
      }}
    >
      <div className="flex flex-row-reverse items-center justify-between uppercase">
        <h4 className="text-xs font-normal">
          {formatToIndonesianDate(task.deadlineCurrentBoard)}
        </h4>
        <div className="rounded bg-destructive px-[5px] py-[2px] text-xs font-normal text-white">
          wip
        </div>
      </div>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/data/${desainImgUrl}`}
        alt="Kaos"
        width={160}
        height={77}
        className="h-[76px] rounded-md border border-gray-400 object-cover"
      />
      <div className="flex justify-between text-xs font-normal uppercase">
        <p className="text-teal">{formatToIndonesianDate(tglMasuk ?? "")}</p>
        <p className="text-yellow-500">
          {formatToIndonesianDate(tglKeluar ?? "")}
        </p>
      </div>
      <div className="flex flex-col space-y-[3px] text-xs font-normal uppercase">
        <h4>{noInvoice ?? "-"}</h4>
        <p className="text-gray-400">{jumlah ?? 0} pcs</p>
        <div className="flex space-x-[5px]">
          <Link
            onClick={(e) => e.stopPropagation()}
            href={
              task.productionData?.desainImgUrl
                ? process.env.NEXT_PUBLIC_API_BASE_URL +
                  "/data/" +
                  task.productionData?.desainImgUrl
                : "#"
            }
            target="_blank"
          >
            <IconImage className="h-[14px] w-[14px] cursor-pointer text-teal" />
          </Link>
          <Link
            href={
              task.productionData?.desainCdrUrl
                ? process.env.NEXT_PUBLIC_API_BASE_URL +
                  "/data" +
                  task.productionData?.desainCdrUrl
                : "#"
            }
            target="_blank"
          >
            <IconCDR className="h-[14px] w-[14px] cursor-pointer text-teal" />
          </Link>
          <IconDownload className="h-[14px] w-[14px] cursor-pointer text-teal" />
        </div>
      </div>
    </div>
  );
};
