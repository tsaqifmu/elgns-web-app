import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CardBoard from "./cardBoard";

interface BoardItem {
  _id: string;
  name: string;
  order: number;
  access: string[];
  __v: number;
}

export type BoardResponse = BoardItem[];

const BoardItemComponent = ({ board }: { board: BoardItem }) => {
  return (
    <div className="h-fit w-52 flex-none rounded-md border-2 border-gray-500 bg-white p-[10px]">
      <div className="flex flex-col space-y-[10px]">
        <header className="flex space-x-2">
          <h3 className="w-fit rounded-sm bg-gray-400 px-[5px] py-[2px] text-sm font-bold uppercase text-white">
            {board.name}
          </h3>
          <h3 className="h-6 w-6 rounded-full bg-gray-400 text-center text-white">
            1
          </h3>
        </header>

        {/* Component for each card */}
        <CardBoard boardId={board._id} />
      </div>
    </div>
  );
};

const BoardList = ({ boardList }: { boardList: BoardResponse }) => {
  return (
    <ScrollArea>
      <div className="flex space-x-[15px] overflow-auto pb-5">
        {boardList.map((board: BoardItem) => (
          <BoardItemComponent key={board._id} board={board} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default BoardList;
