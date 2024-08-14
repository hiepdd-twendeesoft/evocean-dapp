'use client';

import { INITIAL_PAGE, INITIAL_TAKE } from '@/constants/base';
import { IThemeItem } from '@/models/theme.type';
import { fetchThemes } from '@/services/theme';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pagination } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductItem } from './components/ProductItem';
import { EQueryKeys } from '@/types/common';

function ProductPage() {
  const [page, setPage] = useState(INITIAL_PAGE);

  const { data: productResponse, isLoading } = useQuery({
    queryKey: [EQueryKeys.YOUR_PRODUCTS, { page }],
    queryFn: () =>
      fetchThemes({
        page: page,
        take: INITIAL_TAKE
      })
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Your products
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <Link
            href={'/admin/new-product'}
            className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[14px] ml-4"
          >
            New product
          </Link>
        </div>
      </div>
      {productResponse?.data && (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-lg font-light text-surface text-[#000]">
                  <thead className="border-b border-neutral-200 font-medium">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Sales
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Earning
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productResponse?.data.map((item, index) => (
                      <ProductItem key={index} product={item} />
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
