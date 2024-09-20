import { ColumnItem } from "@/types/monitoring/column-item";
import { TaskCard } from "./task-card";
import { Task } from "@/types/monitoring/task";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

interface TaskListProps {
  tasks: Task[];
  column: ColumnItem;
}

const TaskList = ({ tasks, column }: TaskListProps) => {
  const tasksId = useMemo(() => tasks.map((task) => task._id), [tasks]);

  return (
    <SortableContext items={tasksId}>
      {tasks.map((task: Task) => (
        <TaskCard key={task._id} task={task} column={column} />
      ))}
    </SortableContext>
  );
};

export default TaskList;
