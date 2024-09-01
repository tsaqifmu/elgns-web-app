import Image from "next/image";
import { dateIdFormat } from "@/hooks/useCustomers";
import { useFetchCardBoard } from "@/hooks/useMonitoring";

import IconCDR from "@/public/icons/table/cdr.svg";
import IconImage from "@/public/icons/table/image.svg";
import IconDownload from "@/public/icons/table/download.svg";
import SkeletonCard from "./skeleton-card";
import ErrorLoadData from "../error-load-data";

interface ProductionData {
  _id: string;
  noInvoice: string;
  tglKeluar: string;
  tglMasuk: string;
  jumlah: number;
  desainImgUrl: string;
  desainCdrUrl: string;
}
interface Card {
  _id: string;
  productionData: ProductionData;
  buktiPengerjaan: string[];
  currentBoardId: string;
  startDateCurrentBoard: string;
  deadlineCurrentBoard: string;
  __v: number;
}

export interface CardsResponse {
  cardsCount: number;
  cards: Card[];
}

const Card = ({
  productionData,
  deadlineCurrentBoard,
}: {
  productionData: ProductionData;
  deadlineCurrentBoard: string;
}) => {
  const { noInvoice, jumlah, desainImgUrl, tglKeluar, tglMasuk } =
    productionData || {};

  return (
    <div className="flex flex-col space-y-[5px] rounded-md border-2 border-gray-400 bg-gray-100 p-[10px]">
      <div className="flex flex-row-reverse items-center justify-between uppercase">
        <h4 className="text-xs font-normal">
          {dateIdFormat(deadlineCurrentBoard)}
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
        <p className="text-teal">{dateIdFormat(tglMasuk)}</p>
        <p className="text-yellow-500">{dateIdFormat(tglKeluar)}</p>
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

const CardBoard = ({ boardId }: { boardId: string }) => {
  const { data, isError, isLoading, error } = useFetchCardBoard(boardId);

  if (isLoading) return <SkeletonCard />;
  if (isError) return <ErrorLoadData error={error} />;
  if (!data) return null;

  const cards = data.cards;
  return (
    <>
      {cards.map((card: Card) => (
        <Card
          key={card._id}
          productionData={card?.productionData}
          deadlineCurrentBoard={card.deadlineCurrentBoard}
        />
      ))}
    </>
  );
};

export default CardBoard;
