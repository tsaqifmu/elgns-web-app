import Image from "next/image";

import kaos from "@/public/images/kaos.png";
import IconImage from "@/public/icons/table/image.svg";
import IconCDR from "@/public/icons/table/cdr.svg";
import IconDownload from "@/public/icons/table/download.svg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BoardList = ({ boardList }: { boardList: any }) => {
  return (
    <ScrollArea>
      <div className="flex space-x-[15px] overflow-auto pb-5">
        {/* Boards */}
        {boardList.map((board: any) => (
          <div
            key={board._id}
            className="w-52 flex-none rounded-md border-2 border-gray-500 bg-white p-[10px]"
          >
            <div className="flex flex-col space-y-[10px]">
              <header className="flex space-x-2">
                <h3 className="w-fit rounded-sm bg-gray-400 px-[5px] py-[2px] text-sm font-bold uppercase text-white">
                  {board.name}
                </h3>
                <h3 className="h-6 w-6 rounded-full bg-gray-400 text-center text-white">
                  1
                </h3>
              </header>

              {/* Card */}
              <div className="flex flex-col space-y-[5px] rounded-md border-2 border-gray-400 bg-gray-100 p-[10px]">
                <div className="flex flex-row-reverse items-center justify-between uppercase">
                  <h4 className="text-xs font-normal">set deadline</h4>
                  <div className="rounded bg-destructive px-[5px] py-[2px] text-xs font-normal text-white">
                    wip
                  </div>
                </div>
                <Image
                  src={kaos}
                  alt="Kaos"
                  width={160}
                  height={77}
                  className="rounded-md border border-gray-400"
                />
                <div className="flex justify-between text-xs font-normal uppercase">
                  <p className="text-teal">23 feb 2024</p>
                  <p className="text-yellow-500">7 mar 2024</p>
                </div>
                <div className="flex flex-col space-y-[3px] text-xs font-normal uppercase">
                  <h4>ings (kelor united)</h4>
                  <p className="text-gray-400">45 pcs</p>

                  {/* Icons */}
                  <div className="flex space-x-[5px]">
                    <IconImage className="h-[14px] w-[14px] text-teal" />
                    <IconCDR className="h-[14px] w-[14px] text-teal" />
                    <IconDownload className="h-[14px] w-[14px] text-teal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default BoardList;
