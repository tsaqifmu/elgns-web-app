import { ColumnItem } from "@/types/monitoring/column-item";
import { Task } from "@/types/monitoring/task";
import TaskList from "./task-list";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface ColumnProps {
  column: ColumnItem;
  tasks: Task[];
}

export const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-fit w-52 flex-none rounded-md border-2 border-gray-500 bg-white p-[10px]"
    >
      <div className="flex flex-col space-y-[10px]">
        <header className="flex space-x-2">
          <h3 className="w-fit rounded-sm bg-gray-400 px-[5px] py-[2px] text-sm font-bold uppercase text-white">
            {column.name}
          </h3>
          <h3 className="h-6 w-6 rounded-full bg-gray-400 text-center text-white">
            {tasks.length}
          </h3>
        </header>

        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};
