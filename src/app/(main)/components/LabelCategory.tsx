"use client";

import Link from "next/link";
import { FC } from "react";

interface IProps {
  href: string;
  label: string;
}

const LabelCategory: FC<IProps> = ({ href, label }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-gray-900 text-1xl font-semibold mb-4 md:text-2xl">
        {label}
      </h2>
      <Link href={href} className="flex items-center">
        <p className="text-sm text-indigo-600 font-medium mr-[4px]">View all</p>
        <img
          src={"assets/image/arrow-right.svg"}
          alt="arrow"
          className="w-[14px]"
        />
      </Link>
    </div>
  );
};

export default LabelCategory;
