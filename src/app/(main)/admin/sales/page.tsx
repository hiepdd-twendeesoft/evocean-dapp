'use client';

import { INITIAL_PAGE, INITIAL_TAKE } from '@/constants/base';
import { ISaleItem } from '@/models/sale.type';
import { getCryptoPrice } from '@/services/get-crypto-price';
import { getDashboardSales } from '@/services/get-dashboard-sales';
import { parseDate } from '@/utils/helper';
import { lamportsToSol } from '@/utils/lamports-to-sol';
import { useQueryClient } from '@tanstack/react-query';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

function SalesPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [sales, setSales] = useState<ISaleItem[]>();
  const [dataPrice, setDataPrice] = useState<any>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadData = async () => {
      const result = await queryClient.fetchQuery({
        queryKey: ['get-dashboard-sales'],
        queryFn: () =>
          getDashboardSales({
            page: page,
            take: INITIAL_TAKE
          })
      });
      let dataPrice = await queryClient.fetchQuery({
        queryKey: ['get-scrypto-price'],
        queryFn: () => getCryptoPrice('solana')
      });
      setDataPrice(dataPrice);
      setSales(result.data);
    };

    loadData();
  }, [page, queryClient]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9 mb-4">
        Sales
      </h1>
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-lg font-light text-surface text-[#000]">
          <thead className="border-b border-neutral-200 font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">
                Date
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Product
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Earn
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales &&
              sales.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parseDate(row.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.product_name}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    <div className="text-black">
                      $
                      {(
                        lamportsToSol(String(row.price)) *
                        Number(dataPrice?.price_usd)
                      ).toFixed(3)}
                    </div>
                    <div className="text-gray-400">
                      {lamportsToSol(String(row.price)).toFixed(3)} SOL
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    <div className="text-black">
                      $
                      {(
                        lamportsToSol(String(row.earn)) *
                        Number(dataPrice?.price_usd)
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
        <div className="flex justify-center mt-3">
          <Pagination
            total={10}
            pageSize={INITIAL_TAKE}
            current={page}
            onChange={page => {
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

export default SalesPage;
