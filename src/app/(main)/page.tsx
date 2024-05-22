"use client";
import ItemNft from "@/components/itemNft";
import { useFetchTheme } from "@/hooks/useFetchTheme";
import { Fragment } from "react";
import Category from "./components/Category";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchTheme({
    page: 1,
    take: 12,
    listing: true,
  });

  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-slate-800 mt-12 mb-12 max-sm:mb-2 max-w-[70%] max-sm:max-w-[100%] lg:text-6xl md:text-4xl">
        Digital Products resouces to optimize for creative work flow
      </h2>
      <Category />
      {!!data?.pages?.[0]?.data?.length && (
        <h2 className="text-gray-900 text-2xl font-semibold mb-4 lg:text-4xl md:text-3xl">
          Featured
        </h2>
      )}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                image={item.media?.previews?.[0]}
                sale={item.sale}
                listing={item.listing}
                categories={item?.media?.categories}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className="justify-center flex mt-8">
          <button
            onClick={() => fetchNextPage()}
            className="bg-indigo-600 h-[42px] rounded-[12px] px-[18px] hover:scale-105 duration-200"
          >
            <p className="text-base font-semibold text-white">View more</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
