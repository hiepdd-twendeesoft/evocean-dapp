export interface ICollection {
  id: number;
  collection_name: string;
}

export type TCreateCollectionSChema = {
  collection_name: string;
}


export type TCreateCollection = {
    collection_name: string;
    theme_ids: number[];
}

export interface FetchCollectionParams {
  page: number;
  take: number;
  search?: string;
}