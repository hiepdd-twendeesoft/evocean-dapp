"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Route } from "@/constants/route";

const ItemNft = () => {
  const router = useRouter();

  const handleItem = () => {
    router.push(`${Route.DETAIL_THEME}/3637348484`);
  };

  return (
    <div
      onClick={handleItem}
      className="mb-[12px] cursor-pointer hover:-translate-y-1 duration-200"
    >
      <img
        src={"/assets/image/theme.png"}
        alt="Theme"
        className="w-[100%] rounded-[16px] border-gray-300 border-[1px]"
      />
      <h2 className="text-base text-gray-900 font-semibold mt-[12px] line-clamp-1">
        DataWise Framer - Multi-Layout SaaS Framer Template
      </h2>
      <p className="text-[#565E76] text-sm font-normal">UI Kit</p>
      <div className="items-center flex border-gray-200 border-[1px] rounded-[12px] mt-[12px] h-[44px]">
        <div className="flex item-center w-[50%] justify-between px-[12px]">
          <p className="font-medium text-gray-900 text-sm">$45</p>
          <div className="flex items-center">
            <img
              src={"/assets/image/SOL.svg"}
              alt="SOL"
              className="w-[14px] h-[14px]"
            />
            <p className="font-medium text-gray-900 text-sm ml-[4px]">0,26</p>
          </div>
        </div>
        <div className="bg-gray-200 w-[1px] h-[100%]" />
        <div className="flex items-center w-[50%] justify-center">
          <p className="font-medium text-gray-900 text-sm mr-[4px]">Volume:</p>
          <img
            src={"/assets/image/SOL.svg"}
            alt="SOL"
            className="w-[14px] h-[14px]"
          />
          <p className="font-medium text-gray-900 text-sm ml-[4px]">0,26</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemNft);
