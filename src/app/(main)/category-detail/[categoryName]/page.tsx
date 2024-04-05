"use client";
import ItemNft from "@/components/itemNft";
import Category from "../../components/Category";
import { FC, Fragment } from "react";
import { getCategoryName } from "@/utils/utils";
import { useFetchTheme } from "@/hooks/useFetchTheme";

interface IProps {
  params: { categoryName: string };
}

const CategoryDetailPage: FC<IProps> = ({ params }) => {
  const { categoryName } = params;
  const { data } = useFetchTheme({ page: 1, take: 30, listing: true });

  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-slate-800 mt-12 mb-2 max-w-[70%] lg:text-6xl md:text-4xl">
        {getCategoryName(categoryName)}
      </h2>
      <p className="text-base text-gray-600 font-normal max-w-[70%]">
        The ultimate shortcut in design. Equipped with ready-to-use UI
        components, you free to concentrate on the creative aspects of your
        projects without dedicating time to foundational elements.
      </p>
      <Category />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-3 md:grid-cols-2 mb-8">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                Sale={item.Sale}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
