import { useState } from "react";

export interface SelectFeatureProps {
  data: any;
}

export const SelectFeature = ({ data }: SelectFeatureProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState("");
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between gap-4 border border-1 border-[#9CA3AF] p-4 rounded-[8px] w-full cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <img src={"/assets/image/admin/check.svg"} />
          <h3>{feature}</h3>
        </div>
        <img src={"/assets/image/admin/list.svg"} />
      </div>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 absolute"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {data &&
              data.map((item: any, index: any) => (
                <li
                  onClick={() => {
                    setFeature(item.name);
                    setIsOpen(false);
                  }}
                  key={index}
                  className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
