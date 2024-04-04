import { FetchThemeParams, ItemTheme, ListData } from "@/models/common.type";
import { fetchThemes } from "@/services/common.service";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useFetchTheme = (params: FetchThemeParams, disable?: boolean) => {
  return useInfiniteQuery<
    ListData<ItemTheme>,
    Error,
    InfiniteData<ListData<ItemTheme>>,
    any[],
    FetchThemeParams
  >({
    initialPageParam: params,
    queryKey: ["fetchTheme", params],
    queryFn: ({ pageParam }) => {
      return fetchThemes({
        page: pageParam.page,
        take: params.take,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page * lastPage.take < lastPage.total
        ? {
            page: lastPage.page + 1,
            take: params.take,
          }
        : undefined;
    },
    enabled: !disable,
  });
};
