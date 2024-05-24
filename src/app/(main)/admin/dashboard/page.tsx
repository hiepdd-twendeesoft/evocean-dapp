"use client";

import useConvertDollar from "@/hooks/useConvertDollar";
import { getDashboard } from "@/services/amin";
import { lamportsToSol } from "@/utils/lamports-to-sol";
import { useQuery } from "@tanstack/react-query";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

import { useRef } from "react";

import { Line } from "react-chartjs-2";

function DashboardPage() {
  Chart.register(CategoryScale);
  const ref = useRef();

  const { data: statistic, refetch } = useQuery({
    queryKey: ["get-dashboard"],
    queryFn: () => getDashboard(),
  });

  console.log("statistic", statistic);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        backgroundColor: "rgb(67, 56, 202, 0.2)",
        borderColor: "rgb(67, 56, 202, 1)",
      },
      {
        label: "Selling",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        backgroundColor: "rgb(132, 204, 22, 0.2)",
        borderColor: "rgb(132, 204, 22, 1)",
      },
      {
        label: "Owned",
        data: [65, 45, 12, 43, 14, 86],
        fill: false,
        backgroundColor: "rgb(20, 184, 166, 0.2)",
        borderColor: "rgb(20, 184, 166, 1)",
      },
    ],
  };
  return (
    <div>
      <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
        Dashboard
      </h1>
      <ul className="mt-[44px] flex gap-4">
        <li className="p-[32px] border-r border-solid border-[1px] basis-1/3 rounded-[24px]">
          <h4 className="text-[#4B5563] text-[14px] font-semibold uppercase">
            Selling Product earned
          </h4>
          <div className="flex items-center text-[30px] font-bold uppercase mt-1">
            <h1 className="text-[#9CA3AF]">$</h1>
            <h1 className="text-[#111827]">
              {useConvertDollar(
                lamportsToSol(statistic?.data?.sellingTotal || 0)
              )}
            </h1>
          </div>
          <div className="flex items-center text-[24px] font-bold uppercase">
            <img
              src={"/assets/image/SOL 2.svg"}
              alt="eye"
              className="w-[18px] ml-2"
            />
            <h1 className="text-[#6B7280]">
              {lamportsToSol(statistic?.data?.sellingTotal || 0)}
            </h1>
          </div>
          <div className="mt-[32px] flex items-center justify-between">
            <div className="w-[60%] text-[#4B5563]">
              You selled total 3,123 items started from 20 May 2024.
            </div>
            <button className="w-[34%] flex justify-center items-center px-[17px] py-[9px] border-r border-solid border-[1px] rounded-[12px]">
              View sales
            </button>
          </div>
        </li>
        <li className="p-[32px] border-r border-solid border-[1px] basis-1/3 rounded-[24px]">
          <h4 className="text-[#4B5563] text-[14px] font-semibold uppercase">
            Owned Product earned
          </h4>
          <div className="flex items-center text-[30px] font-bold uppercase mt-1">
            <h1 className="text-[#9CA3AF]">$</h1>
            <h1 className="text-[#111827]">
              {useConvertDollar(
                lamportsToSol(statistic?.data?.sellingOwnerTotal || 0)
              )}
            </h1>
          </div>
          <div className="flex items-center text-[24px] font-bold uppercase">
            <img
              src={"/assets/image/SOL 2.svg"}
              alt="eye"
              className="w-[18px] ml-2"
            />
            <h1 className="text-[#6B7280]">
              {lamportsToSol(statistic?.data?.sellingOwnerTotal || 0)}
            </h1>
          </div>
          <div className="mt-[32px] flex items-center justify-between rounded-[24px]">
            <div className="w-[60%] text-[#4B5563]">
              Your 20 owned product has produced 5,423 sales.
            </div>
            <button className="w-[34%] flex justify-center items-center px-[17px] py-[9px] border-r border-solid border-[1px] rounded-[12px]">
              View owned
            </button>
          </div>
        </li>
        <li className="p-[32px] border-r border-solid border-[1px] basis-1/3">
          <h4 className="text-[#4B5563] text-[14px] font-semibold uppercase">
            Total Payout
          </h4>
          <div className="flex items-center text-[30px] font-bold uppercase mt-1">
            <h1 className="text-[#9CA3AF]">$</h1>
            <h1 className="text-[#111827]">
              {useConvertDollar(
                lamportsToSol(statistic?.data?.totalPayout || 0)
              )}
            </h1>
          </div>
          <div className="flex items-center text-[24px] font-bold uppercase">
            <img
              src={"/assets/image/SOL 2.svg"}
              alt="eye"
              className="w-[18px] ml-2"
            />
            <h1 className="text-[#6B7280]">
              {lamportsToSol(statistic?.data?.totalPayout || 0)}
            </h1>
          </div>
          <div className="mt-[32px] flex items-center justify-between">
            <div className="w-[60%] text-[#4B5563]">
              We start payouts from the 1st and 3rd of each month.
            </div>
            <button className="w-[34%] flex justify-center items-center px-[17px] py-[9px] border-r border-solid border-[1px] rounded-[12px]">
              View payout
            </button>
          </div>
        </li>
      </ul>
      <div className="mt-[44px] p-[32px] border-r border-solid border-[1px] basis-1/3 rounded-[24px]">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase font-semibold text-[14px]">
                Earning history
              </h6>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Line
              ref={ref}
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      boxHeight: 5,
                      boxWidth: 5,
                      padding: 30,
                      font: {
                        size: 18,
                        weight: 500,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
