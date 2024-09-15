import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Column } from "./column";
import { ColumnResponse } from "@/types/monitoring/column-response";
import { ColumnItem } from "@/types/monitoring/column-item";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { Task } from "@/types/monitoring/task";
import { createPortal } from "react-dom";
import { TaskCard } from "./task-card";
import { useUpdateTaskPosition } from "@/hooks/monitoring/useUpdateTaskPosition";

interface ColumnListProps {
  columnList: ColumnResponse;
  tasksResponse: Task[];
}

const ColumnList = ({ columnList, tasksResponse }: ColumnListProps) => {
  console.log("harusnya rerender columnlist sih");
  const [tasks, setTasks] = useState<Task[]>(tasksResponse);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const columnsId = useMemo(
    () => columnList.map((column) => column.id),
    [columnList],
  );
  const { mutate: updateTaskPosition } = useUpdateTaskPosition();

  const filterTasks = (columnId: string) => {
    let filteredTasks = tasks.filter(
      (task) => task.currentBoardId === columnId,
    );

    // sort waiting list tasks descendingly
    if (columnId === "669e5c021129806c40041128") {
      filteredTasks.sort((a, b) => {
        const dateA = new Date(a.startDateCurrentBoard).getTime();
        const dateB = new Date(b.startDateCurrentBoard).getTime();
        return dateB - dateA;
      });
    }
    return filteredTasks;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    let columnId: string = over.id as string;
    if (over.data.current?.type === "Task") {
      columnId = over.data.current?.task?.currentBoardId;
    }
    const activeIndex = tasks.findIndex((task) => task._id === active.id);
    const payload = {
      taskId: tasks[activeIndex]._id,
      columnId: columnId,
    };
    updateTaskPosition(payload);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === active.id);
        const overIndex = tasks.findIndex((task) => task._id === over.id);

        tasks[activeIndex].currentBoardId = tasks[overIndex].currentBoardId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === active.id);
        tasks[activeIndex].currentBoardId = over.id as string;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <ScrollArea>
        <div className="flex space-x-[15px] overflow-auto pb-5">
          <SortableContext items={columnsId}>
            {columnList.map((column: ColumnItem) => (
              <Column
                key={column.id}
                column={column}
                tasks={filterTasks(column.id)}
              />
            ))}
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body,
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
};

export default ColumnList;
