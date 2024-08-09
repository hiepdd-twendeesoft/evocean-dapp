import { IThemeItem } from "./theme.type";

export interface ICollection {
  id: number;
  name: string;
  theme_ids: number[];
  themes: IThemeItem[];
}

export type TCreateCollectionSChema = {
  collection_name: string;
};

export type TCreateCollection = {
  id?: number;
  collection_name: string;
  theme_ids: number[];
};

export interface FetchCollectionParams {
  page: number;
  take: number;
  search?: string;
}
