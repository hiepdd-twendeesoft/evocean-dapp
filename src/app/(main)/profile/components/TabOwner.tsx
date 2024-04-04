"use client";
import { useFetchTheme } from "@/hooks/useFetchTheme";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Fragment } from "react";
import ItemRowProduct from "../items/ItemRowProduct";

const TabOwner = () => {
  const wallet = useAnchorWallet();

  const { data } = useFetchTheme(
    { page: 1, take: 1, author: wallet?.publicKey?.toBase58() },
    !wallet?.publicKey
  );

  return (
    <div className="mb-8 mt-10">
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        Your Owned products
      </h3>
      <p className="text-base text-gray-600 font-normal">
        View all successfully bid and owned products, along with your sales and
        earnings from these items.
      </p>
      <div className="w-full xl:mb-0 mt-12">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full">
              <thead>
                <tr className="border-b-[1px] border-b-gray-200">
                  <th className="pl-4 pr-14 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Product
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Author
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Price
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Sales
                  </th>
                  <th className="px-4 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Earning
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.pages?.map((page, indexPage) => (
                  <Fragment key={indexPage}>
                    {page.data?.map((item, index) => (
                      <ItemRowProduct
                        key={index}
                        name={item.name}
                        image={item.media?.previews?.[0]}
                        author_address={item.author_address}
                        Sale={item.Sale}
                        id={item.id}
                      />
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOwner;
