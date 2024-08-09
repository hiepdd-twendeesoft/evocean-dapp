"use client";

import { INITIAL_PAGE, INITIAL_TAKE } from "@/constants/base";
import { ICollection } from "@/models/collection.type";
import { deleteCollection, fetchCollections } from "@/services/collection";
import { useQueryClient } from "@tanstack/react-query";
import { Pagination, Popconfirm, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProductPage() {
  const [themes, setThemes] = useState<ICollection[]>();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(INITIAL_PAGE);
  const loadData = async () => {
    const result = await queryClient.fetchQuery({
      queryFn: () =>
        fetchCollections({
          page: page,
          take: INITIAL_TAKE,
        }),
      queryKey: [],
    });
    setThemes(result.data);
  };

  useEffect(() => {
    loadData();
  }, [page, queryClient]);

  const confirm = async (collection_id: number) => {
    try {
      await deleteCollection(collection_id);
      message.success("Delete collection successfully");
      await loadData();
    } catch (err) {
      message.error("Delete collection failed");
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
            href={"/admin/new-collection"}
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
                  </tr>
                </thead>
                <tbody>
                  {themes &&
                    themes.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center cursor-pointer justify-between">
                          <h2>{item.name}</h2>
                          <div className="flex items-center gap-8">
                            <Link
                              className="flex items-center gap-2"
                              href={`/admin/your-collections/${item.id}`}
                            >
                              <h2 className="text-[#4F46E5] text-[14px]">
                                Edit
                              </h2>
                              <img
                                src={"/assets/image/admin/edit.svg"}
                                alt="edit"
                              />
                            </Link>
                            <Popconfirm
                              title="Title"
                              description="Do you want to delete this collection"
                              onConfirm={() => confirm(item.id)}
                              onOpenChange={() => console.log("open change")}
                            >
                              <div className="flex items-center gap-2">
                                <h2 className="text-[#4F46E5] text-[14px]">
                                  Delete
                                </h2>
                                <img
                                  className="w-[20px] h-[20px]"
                                  src={"/assets/image/admin/delete.svg"}
                                  alt="delete"
                                />
                              </div>
                              {/* <Button type="primary">Open Popconfirm with Promise</Button> */}
                            </Popconfirm>
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
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
