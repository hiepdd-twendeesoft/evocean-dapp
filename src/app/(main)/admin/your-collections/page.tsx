'use client';

import { INITIAL_PAGE, INITIAL_TAKE } from '@/constants/base';
import { deleteCollection, fetchCollections } from '@/services/collection';
import { EQueryKeys } from '@/types/common';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pagination, Popconfirm, message } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function YourCollectionPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(INITIAL_PAGE);

  const { data: collectionRes } = useQuery({
    queryKey: [EQueryKeys.YOUR_COLLECTION],
    queryFn: () =>
      fetchCollections({
        page: page,
        take: INITIAL_TAKE
      })
  });

  const confirm = async (collection_id: number) => {
    try {
      await deleteCollection(collection_id);
      message.success('Delete collection successfully');
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.YOUR_COLLECTION] });
    } catch (err) {
      message.error('Delete collection failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Your collections
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <Link
            href={'/admin/new-collection'}
            className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[14px] ml-4"
          >
            New collection
          </Link>
        </div>
      </div>
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
                      Ownership ratio
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Earning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collectionRes?.data &&
                    collectionRes?.data.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center cursor-pointer justify-between">
                          <div className="flex gap-[14px] items-center">
                            <Image
                              width={172}
                              height={120}
                              alt="thumbnail"
                              src={item.thumbnail}
                              className="object-cover h-[120px] rounded-lg"
                            />
                            <div>
                              <h2>{item.name}</h2>
                              <p className="text-gray-500 text-[14px]">
                                Owned:{' '}
                                {moment(item.created_at).format('DD/MM/YYYY')}{' '}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <Link
                              className="flex items-center gap-2"
                              href={`/admin/your-collections/${item.id}`}
                            >
                              <h2 className="text-[#4F46E5] text-[14px]">
                                Edit
                              </h2>
                              <img
                                src={'/assets/image/admin/edit.svg'}
                                alt="edit"
                              />
                            </Link>
                            <Popconfirm
                              title="Title"
                              description="Do you want to delete this collection"
                              onConfirm={() => confirm(item.id)}
                              onOpenChange={() => console.log('open change')}
                            >
                              <div className="flex items-center gap-2">
                                <h2 className="text-[#4F46E5] text-[14px]">
                                  Delete
                                </h2>
                                <img
                                  className="w-[20px] h-[20px]"
                                  src={'/assets/image/admin/delete.svg'}
                                  alt="delete"
                                />
                              </div>
                              {/* <Button type="primary">Open Popconfirm with Promise</Button> */}
                            </Popconfirm>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 ">
                            ${item.sellingPricing}
                          </span>
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-3">
                <Pagination
                  total={collectionRes?.total}
                  pageSize={INITIAL_TAKE}
                  current={page}
                  onChange={page => {
                    setPage(page);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourCollectionPage;
