"use client";

import { getCryptoPrice } from "@/services/get-crypto-price";
import { getDashboardSales } from "@/services/get-dashboard-sales";
import { useQuery } from "@tanstack/react-query";
import { lamportsToSol } from "@/utils/lamports-to-sol";
import React from "react";
import { parseDate } from "@/utils/helper";

function SalesPage() {
  const { data } = useQuery({
    queryKey: ["get-dashboard-sales"],
    queryFn: () => getDashboardSales(),
  });

  let dataPrice = useQuery({
    queryKey: ["get-scrypto-price"],
    queryFn: () => getCryptoPrice("solana"),
  });

  return (
    <div className="overflow-x-auto">
      <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9 mb-4">
        Sales
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Earn
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parseDate(row.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.product_name}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                style={{ whiteSpace: "pre-line" }}
              >
                <div className="text-black">
                  $
                  {(
                    lamportsToSol(String(row.price)) *
                    Number(dataPrice.data?.price_usd)
                  ).toFixed(3)}
                </div>
                <div className="text-gray-400">
                  {lamportsToSol(String(row.price)).toFixed(3)} SOL
                </div>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                style={{ whiteSpace: "pre-line" }}
              >
                <div className="text-black">
                  $
                  {(
                    lamportsToSol(String(row.earn)) *
                    Number(dataPrice.data?.price_usd)
                  ).toFixed(3)}
                </div>
                <div className="text-gray-400">
                  {lamportsToSol(String(row.earn)).toFixed(3)} SOL
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage;
