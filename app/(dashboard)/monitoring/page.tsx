import Image from "next/image";
import React from "react";

const MonitoringPage = () => {
  return (
    <div>
      <div className="w-52 rounded-md border-2 border-gray-500 bg-white p-[10px]">
        <div className="flex flex-col space-y-[10px]">
          <header className="flex space-x-2">
            <h3 className="w-fit rounded-sm bg-gray-400 px-[5px] py-[2px] text-sm font-bold uppercase text-white">
              Waiting List
            </h3>
            <h3 className="h-6 w-6 rounded-full bg-gray-400 text-center text-white">
              1
            </h3>
          </header>

          {/* Card */}
          <div className="border-2 border-gray-400 bg-gray-100 p-[10px]">
            {/* <Image /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
