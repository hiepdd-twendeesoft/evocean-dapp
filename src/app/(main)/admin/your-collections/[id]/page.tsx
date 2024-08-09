"use client";

import { INITIAL_PAGE } from "@/constants/base";
import {
  ICollection,
  TCreateCollection,
  TCreateCollectionSChema,
} from "@/models/collection.type";
import { FetchThemeParams } from "@/models/common.type";
import { IThemeItem } from "@/models/theme.type";
import { fetchCollection } from "@/services/collection";
import { fetchThemes } from "@/services/theme";
import {
  createCollectionAction,
  updateCollectionAction,
} from "@/store/actions/collection";
import { useAppDispatch } from "@/store/store";
import { createCollectionSchema } from "@/validation/admin/collection.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Dropdown, Input, Select, SelectProps, message } from "antd";
import { useParams, useRouter } from "next/navigation";
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
    setValue,
  } = useForm<TCreateCollectionSChema>({
    resolver: yupResolver(createCollectionSchema),
  });
  const router = useRouter();
  const [themes, setThemes] = useState<IThemeItem[]>();
  const [search, setSearch] = useState<string>("");
  const [collection, setCollection] = useState<ICollection>();
  const [selectedValue, setSelectedValue] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(INITIAL_PAGE);
  const { id } = useParams<{ id: string }>();
  const handleBack = () => {
    router.back();
  };

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
      const collection = await queryClient.fetchQuery({
        queryKey: ["get-theme", id],
        queryFn: () => fetchCollection(Number(id)),
      });
      setCollection(collection);
      const collectionNames = collection?.themes?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setSelectedValue(collectionNames);
    };

    loadData();
  }, [page, queryClient, search]);

  useEffect(() => {
    if (collection) {
      // setTheme(collection.)
      setValue("collection_name", collection.name);
    }
  }, [collection]);

  const onSubmit: SubmitHandler<TCreateCollectionSChema> = async (data) => {
    const createCollectionDto: TCreateCollection = {
      ...data,
      theme_ids: selectedValue.map((item) => Number(item.value)),
      id: Number(id),
    };

    try {
      const result = await dispatch(
        updateCollectionAction(createCollectionDto),
      ).unwrap();
      message.success("Update collection successfully");
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

  const handleChange = (value: string[], object: any) => {
    // const checkThemeId = theme.
    // setThemeIds
    // setSelectedValue()
    console.log(object);
    setSelectedValue(object);
  };

  console.log("selectedValue", selectedValue);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Update collection
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <button
            onClick={handleBack}
            type="button"
            className="bg-[#888] text-white px-[17px] py-[9px] rounded-[14px] ml-4"
          >
            Back
          </button>
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
          <h2>Theme</h2>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Choose themes"
            filterOption={false}
            onSearch={(value) => {
              setSearch(value);
            }}
            // defaultValue={collection?.themes?.map(item => item.name.toString())}
            value={selectedValue}
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
