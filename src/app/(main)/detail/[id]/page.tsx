import Preview from "../components/Preview";

const DetailThemePage = () => {
  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <div className="flex items-start justify-between">
        <div className="w-[53%]">
          <Preview />
        </div>
        <div className="w-[43%]">
          <div className="flex items-center flex-wrap mb-6">
            <div className="h-[28px] bg-indigo-100 rounded-[12px] px-[16px] mr-[12px] flex items-center justify-center">
              <p className="text-sm text-indigo-800 font-medium">UI Kit</p>
            </div>
            <div className="h-[28px] bg-indigo-100 rounded-[12px] px-[16px] mr-[12px] flex items-center justify-center">
              <p className="text-sm text-indigo-800 font-medium">
                Framer template
              </p>
            </div>
          </div>
          <h2 className="text-4xl text-gray-900 font-semibold mb-3">
            Nimbus - Multi-Layout AI-Powerd SaaS Template
          </h2>
          <p className="text-gray-600 text-base font-normal">
            Framer SaaS template with 3 unique homepage and multi-purpose
            pre-built pages
          </p>
          <div className="bg-gray-100 rounded-[20px] p-[12px] mt-8">
            <div className="flex items-center">
              <div className="h-[50px] flex flex-1 bg-indigo-600 items-center justify-center cursor-pointer rounded-[12px] hover:scale-105 duration-200">
                <p className="text-base font-semibold text-white">
                  Buy for $32
                </p>
              </div>
              <div className="h-[50px] flex-1 flex items-center ml-3 justify-center rounded-[12px] border-indigo-600 border-[1px] cursor-pointer hover:scale-105 duration-200">
                <p className="text-gray-700 font-semibold text-base mr-3">
                  Buy for 0.6 SOL
                </p>
                <img
                  src={"/assets/image/SOL.svg"}
                  alt="SOL"
                  className="w-[20px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 mb-4">
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-gray-900">Sale</p>
                <img
                  src={"/assets/image/sale.svg"}
                  alt="sale"
                  className="w-[14px] mx-[4px]"
                />
                <p className="text-sm font-medium text-gray-900">312</p>
              </div>
              <img
                src={"/assets/image/arrow-right.svg"}
                alt="arrow"
                className="w-[14px]"
              />
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-gray-900">Volume</p>
                <img
                  src={"/assets/image/SOL.svg"}
                  alt="SOL"
                  className="w-[14px] mx-[4px]"
                />
                <p className="text-sm font-medium text-gray-900">222.3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailThemePage;
