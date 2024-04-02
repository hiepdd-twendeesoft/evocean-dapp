"use client";

import { Fragment, lazy, useState } from "react";
import InfoItem from "./InfoItem";
import TabNavigation from "@/components/tabNavigation";
import { TAB_DETAIL } from "@/constants/data";
import { useControlTab } from "@/hooks/useControlTab";

const TabOverView = lazy(
  () => import("@/app/(main)/detail/components/TabOverview")
);
const TabTransaction = lazy(
  () => import("@/app/(main)/detail/components/TabTransaction")
);

const ContentTab = () => {
  const { indexTab, handleChangeTab } = useControlTab();

  return (
    <Fragment>
      <TabNavigation
        tabs={TAB_DETAIL}
        indexActive={indexTab}
        handleChange={handleChangeTab}
      />
      <div className="flex items-start justify-between mt-8 max-md:flex-col">
        <div className={`w-[${indexTab === 1 ? 100 : 53}%] max-md:w-[100%]`}>
          {indexTab === 0 && <TabOverView />}
          {indexTab === 1 && <TabTransaction />}
        </div>
        <div
          className={`w-[43%] max-md:w-[100%] ${
            indexTab === 1 ? "hidden" : ""
          }`}
        >
          <h4 className="text-lg font-medium text-gray-900 mb-4">Pages</h4>
          <div className="flex items-center flex-wrap">
            {Array.from(Array(10).keys()).map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-[32px] rounded-[16px] px-3 bg-gray-100 flex items-center justify-center mr-4 mb-3"
                >
                  <img
                    src={"/assets/image/global.svg"}
                    alt="global"
                    className="w-[16px]"
                  />
                  <p className="text-sm font-medium text-gray-800 ml-1">
                    Home {item}
                  </p>
                </div>
              );
            })}
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Highlight
          </h4>
          <Fragment>
            {Array.from(Array(7).keys()).map((item, index) => {
              return (
                <InfoItem
                  key={index}
                  title="Auto Dark Theme available"
                  icon="check-icon"
                />
              );
            })}
          </Fragment>
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Format
          </h4>
          <InfoItem title="Figma" icon="Figma" />
          <InfoItem title="Framer" icon="Framer" />
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Support
          </h4>
          <InfoItem title="How templates work" icon="info-icon" />
        </div>
      </div>
    </Fragment>
  );
};

export default ContentTab;
