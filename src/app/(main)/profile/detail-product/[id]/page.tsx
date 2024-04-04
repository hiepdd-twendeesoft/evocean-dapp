"use client";

import { useRouter } from "next/navigation";

const DetailProduct = () => {
  const { back } = useRouter();
  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <button
        onClick={back}
        className="border-gray-300 border-[1px] flex items-center px-4 rounded-[12px] h-[40px] group hover:border-indigo-600"
      >
        <img
          src="/assets/icon/arrow-left.svg"
          alt="arrow"
          className="w-[16px]"
        />
        <p className="text-sm text-gray-700 font-medium ml-2 group-hover:text-indigo-600">
          Back to the list
        </p>
      </button>
      <h2 className="text-4xl font-semibold text-gray-900 mt-6">
        Nimbus Framer - Multi-Layout AI-Powerd SaaS Framer Template
      </h2>
      <div className="flex items-center mt-4">
        <p className="text-base font-normal text-gray-600">Date: 23 Mar 2024</p>
        <p className="text-base font-normal text-gray-600 ml-4">
          Order #4235123
        </p>
      </div>
      <div className="flex items-start justify-between max-md:flex-col mb-12 mt-12">
        <div className="w-[43%] max-md:w-[100%]">
          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            Information
          </h4>
          <p className="text-base font-normal text-gray-800">
            Thank you for buying the product! Flexible Layout Options: We know
            every business is unique. That is why Nimbus provides a wide range
            of layout sections. You can pick and choose, mix and match to create
            a website that truly represents your brand.
          </p>
          <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
            Files
          </h4>
          <div className="flex items-center mb-6">
            <div className="h-[52px] rounded-[12px] bg-gray-100 px-4 flex items-center justify-center mr-4">
              <p className="text-lg font-semibold text-gray-500">.PDF</p>
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                Framer Template Nimbus
              </h4>
              <p className="text-gray-600 text-base text-normal">1.6 MB</p>
            </div>
            <button className="h-[42px] bg-indigo-600 rounded-[12px] flex items-center justify-center px-4 hover:-translate-y-1 duration-200">
              <p className="text-base text-white font-semibold">Download</p>
            </button>
          </div>
          <div className="flex items-center mb-6">
            <div className="h-[52px] rounded-[12px] bg-gray-100 px-4 flex items-center justify-center mr-4">
              <p className="text-lg font-semibold text-gray-500">.ZIP</p>
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                Framer Template Nimbus
              </h4>
              <p className="text-gray-600 text-base text-normal">1.6 MB</p>
            </div>
            <button className="h-[42px] bg-indigo-600 rounded-[12px] flex items-center justify-center px-4 hover:-translate-y-1 duration-200">
              <p className="text-base text-white font-semibold">Download</p>
            </button>
          </div>
          <div className="flex items-center mb-6">
            <div className="h-[52px] rounded-[12px] bg-gray-100 px-4 flex items-center justify-center mr-4">
              <p className="text-lg font-semibold text-gray-500">.Fig</p>
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                Framer Template Nimbus
              </h4>
              <p className="text-gray-600 text-base text-normal">1.6 MB</p>
            </div>
            <button className="h-[42px] bg-indigo-600 rounded-[12px] flex items-center justify-center px-4 hover:-translate-y-1 duration-200">
              <p className="text-base text-white font-semibold">Download</p>
            </button>
          </div>
        </div>
        <div className="w-[53%] max-md:mt-4 max-md:w-[100%]">
          <div className="border-gray-200 border-[1px] rounded-[12px] p-4 mb-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Order sumary
            </h4>
            <div className="flex items-start mb-6">
              <img
                src="/assets/image/theme.png"
                alt="theme"
                className="w-[126px] rounded-[12px] mr-4"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Nimbus - Multi-Layout AI-Powerd SaaS Template
                </h4>
                <div className="flex items-center flex-wrap">
                  <div className="h-[28px] bg-indigo-100 rounded-[14px] px-3 flex items-center justify-center mr-2">
                    <p className="text-sm font-medium text-indigo-800">
                      UI Kit
                    </p>
                  </div>
                  <div className="h-[28px] bg-indigo-100 rounded-[14px] px-3 flex items-center justify-center">
                    <p className="text-sm font-medium text-indigo-800">
                      Framer template
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Subtotal</p>
              <p className="text-base font-normal text-gray-600">222.22 SOL</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Gas fees</p>
              <p className="text-base font-normal text-gray-600">0.0022 SOL</p>
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-base font-medium text-gray-900">Total price</p>
              <p className="text-base font-medium text-gray-900">
                222.2203 SOL
              </p>
            </div>
          </div>
          <div className="border-gray-200 border-[1px] rounded-[12px] p-4 mb-4">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Transaction
            </h4>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Signature</p>
              <p className="text-base font-normal text-gray-600">
                3boaqwaFiqymrXbcxG
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Time</p>
              <p className="text-base font-normal text-gray-600">14h ago</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Type</p>
              <p className="text-base font-normal text-gray-600">
                Spl-transfer
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">From</p>
              <p className="text-base font-normal text-gray-600">
                2Awpt8...MHPjqN
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">To</p>
              <p className="text-base font-normal text-gray-600">
                0xe3b29...1d73
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-normal text-gray-600">Account</p>
              <p className="text-base font-normal text-gray-600">
                Claynosaurz #9999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
