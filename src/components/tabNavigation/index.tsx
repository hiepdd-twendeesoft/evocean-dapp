"use client";

import { FC, memo } from "react";

interface IProps {
  tabs: string[];
  indexActive: number;
  handleChange: (tab: number) => void;
}

const TabNavigation: FC<IProps> = ({ tabs, indexActive, handleChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex">
        {tabs.map((item, index) => {
          return (
            <button
              onClick={() => handleChange(index)}
              key={index}
              className={`py-4 px-6 text-center font-semibold ${
                indexActive === index ? "border-b-2 border-indigo-500" : ""
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  indexActive === index ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                {item}
              </p>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default memo(TabNavigation);
