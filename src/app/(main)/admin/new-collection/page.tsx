"use client";

import { INITIAL_PAGE } from "@/constants/base";
import {
  TCreateCollection,
  TCreateCollectionSChema,
} from "@/models/collection.type";
import { FetchThemeParams } from "@/models/common.type";
import { IThemeItem } from "@/models/theme.type";
import { fetchThemes } from "@/services/theme";
import { createCollectionAction } from "@/store/actions/collection";
import { useAppDispatch } from "@/store/store";
import { createCollectionSchema } from "@/validation/admin/collection.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Dropdown, Input, Select, SelectProps, message } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

function AddProductPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm<TCreateCollectionSChema>({
    resolver: yupResolver(createCollectionSchema),
  });
  const router = useRouter();
  const [themes, setThemes] = useState<IThemeItem[]>();
  const [themeIds, setThemeIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    const loadData = async () => {
      const params: FetchThemeParams = {
        page: page,
        take: 10,
      };
      if (search) {
        console.log("search", search);
        params["search"] = search;
      }
      const result = await queryClient.fetchQuery({
        queryFn: () => fetchThemes(params),
        queryKey: [],
      });
      console.log("result", result);
      setThemes(result.data);
    };

    loadData();
  }, [page, queryClient, search]);

  const onSubmit: SubmitHandler<TCreateCollectionSChema> = async (data) => {
    const createCollectionDto: TCreateCollection = {
      ...data,
      theme_ids: themeIds,
    };

    try {
      const result = await dispatch(
        createCollectionAction(createCollectionDto)
      ).unwrap();
      message.success("Create collection successfully");
      router.push("/admin/your-collections", { scroll: false });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onError = (error: any) => {
    console.log(Object.values(error));
    for (const item of Object.values(error) as any) {
      message.error(item["message"]);
    }
  };

  const themeOptions = themes?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const handleChange = (value: string[]) => {
    // const checkThemeId = theme.
    // setThemeIds
    setThemeIds(value.map((item) => Number(item)));
    // console.log(`selected ${value}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Add new collection
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <button className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[14px] ml-4">
            Submit
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mt-4">
        <li className="w-full">
          <h2>Collection name</h2>
          <Controller
            name="collection_name"
            control={control}
            render={({ field }) => (
              <Input
                className="px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                type="text"
                {...field}
                status={errors.collection_name?.message ? "error" : ""}
                placeholder={errors.collection_name?.message || ""}
              />
            )}
          />
        </li>
        <li className="w-full mt-2">
          <h2>Figma features</h2>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Choose themes"
            filterOption={false}
            onSearch={(value) => {
              setSearch(value);
            }}
            // defaultValue={["a10", "c12"]}
            onChange={handleChange}
            options={themeOptions}
            className="h-[50px] border-[#D1D5DB]"
          />
        </li>
      </ul>
    </form>
  );
}

export default AddProductPage;
