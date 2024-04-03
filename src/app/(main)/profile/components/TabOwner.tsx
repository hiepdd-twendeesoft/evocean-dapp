const TabOwner = () => {
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
                <tr className="border-b-[1px] border-b-gray-200">
                  <th className="flex items-center border-t-0 pl-4 pr-14 py-4 align-middle text-sm font-medium whitespace-nowrap text-left text-gray-900">
                    <img
                      src={"/assets/image/theme.png"}
                      alt="theme"
                      className="h-[60px] rounded-[8px]"
                    />
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900 line-clamp-1 mb-1">
                        Medinest-Medical UI Kit
                      </h3>
                      <p className="text-sm font-normal text-gray-500">
                        Owned: 20/05/2024
                      </p>
                    </div>
                  </th>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap ">
                    FutixLab
                  </td>
                  <td className="border-t-0 px-4 py-4 align-center text-[14px] text-gray-500 whitespace-nowrap">
                    340
                  </td>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                    8
                  </td>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                    $5655
                  </td>
                </tr>
                <tr className="border-b-[1px] border-b-gray-200">
                  <th className="flex items-center border-t-0 pl-4 pr-14 py-4 align-middle text-sm font-medium whitespace-nowrap text-left text-gray-900">
                    <img
                      src={"/assets/image/theme.png"}
                      alt="theme"
                      className="h-[60px] rounded-[8px]"
                    />
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900 line-clamp-1 mb-1">
                        Medinest-Medical UI Kit
                      </h3>
                      <p className="text-sm font-normal text-gray-500">
                        Owned: 20/05/2024
                      </p>
                    </div>
                  </th>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap ">
                    FutixLab
                  </td>
                  <td className="border-t-0 px-4 py-4 align-center text-[14px] text-gray-500 whitespace-nowrap">
                    340
                  </td>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                    8
                  </td>
                  <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                    $5655
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOwner;
