import { IEarning } from '@/components/collection/CreatorEarning';
import {
  IThemeFeatureType,
  IThemeItem,
  IThemeMedia,
  IThemeTag
} from './theme.type';
import { IThemCategory } from './common.type';

export interface ICreateCollection {
  collection_name: string;
  description: string;
  sellingPricing: string;
  percentageOfOwnership: string;
  ownershipPrice: string;
  linkPreview?: string;
  highlights?: string[];
  thumbnail: string;
  collectionCategories?: string[];
  collectionTags?: string[];
  collectionFeatureTypes?: string[];
  theme_ids?: string[];
  collectionId?: number;
  earnings?: IEarning[];
}

export type TCreateCollectionSchema = {
  collection_name: string;
  description: string;
  sellingPricing: number;
  ownershipPrice: number;
  percentageOfOwnership: string;
  highlights?: string[];
  livePreviewLink?: string;
  collectionCategories?: number[];
  collectionTags?: number[];
  linkPreview?: string;
  feature_ids?: number[];
  thumbnail?: string;
};

export interface ICollection {
  id: number;
  name: string;
  theme_ids: number[];
  themes: IThemeItem[];
  created_by: number;
  description: string;
  linkPreview: string;
  ownershipPrice: string;
  media?: string[];
  percentageOfOwnership: string;
  sellingPricing: string;
  themeCollection?: IThemeCollection[];
  thumbnail: string;
  collectionTags: { tag: IThemeTag }[];
  collectionCategories: { category: IThemCategory }[];
  collectionFeatureTypes: { featureTypes: IThemeFeatureType }[];
  collectionEarnings: ICollectionEarning[];
}

interface ICollectionEarning {
  percentage: string;
  user: { id: string; email: string };
}

export interface IThemeCollection {
  id: number;
  name: string;
  media: IThemeMedia;
}

export type TCreateCollectionSChema = {
  collection_name: string;
};

export interface FetchCollectionParams {
  page: number;
  take: number;
  search?: string;
}

export enum ECollectionTab {
  OVERVIEW = 'Overview',
  FEATURES = 'Features',
  CHOOSE_PRODUCTS = 'ChooseProducts',
  CREATOR_EARNING = 'CreatorEarning'
}
