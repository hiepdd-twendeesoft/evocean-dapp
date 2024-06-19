"use client";

import { INITIAL_PAGE, INITIAL_TAKE } from "@/constants/base";
import { IPayoutItem } from "@/models/payout.type";
import { getDashboardPayout } from "@/services/get-dashboard-payout";
import { parseDate } from "@/utils/helper";
import { lamportsToSol } from "@/utils/lamports-to-sol";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";

function PayoutPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [payouts, setPayouts] = useState<IPayoutItem[]>();
  const queryClient = useQueryClient();

  const loadData = async () => {
    const result = await queryClient.fetchQuery({
      queryKey: ["get-dashboard-payout"],
      queryFn: () =>
        getDashboardPayout({
          page: page,
          take: INITIAL_TAKE,
        }),
    });
    setPayouts(result.data);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div>
      <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9 mb-4">
        Payout
      </h1>
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-lg font-light text-surface text-[#000]">
          <thead className="border-b border-neutral-200 font-medium">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3">Note / ID</th>
              <th className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payouts &&
              payouts.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parseDate(row.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">{row.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.note}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lamportsToSol(String(row.amount)).toFixed(3)} SOL
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-3">
        <Pagination
          total={10}
          pageSize={INITIAL_TAKE}
          current={page}
          onChange={(page) => {
            setPage(page);
          }}
          onShowSizeChange={(current, size) => {
            setPage(size);
          }}
        />
      </div>
      </div>
    </div>
  );
}

export default PayoutPage;
