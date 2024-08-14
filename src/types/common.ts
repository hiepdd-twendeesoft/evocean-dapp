import { EProductTab } from './product';

export enum EQueryKeys {
  PRODUCT_CATEGOIES = 'product_categories',
  PRODUCT_TAGS = 'product_tags',
  THEME_DETAIL = 'theme_detail',
  FEATURE_TYPE = 'feature_type',
  YOUR_PRODUCTS = 'your_product'
}

export const NAV_LINKS = [
  {
    title: 'Overview',
    value: EProductTab.OVERVIEW
  },
  {
    title: 'Features',
    value: EProductTab.FEATURES
  },
  {
    title: 'Upload Images',
    value: EProductTab.UPLOAD_IMAGE
  },
  {
    title: 'Upload File',
    value: EProductTab.UPLOAD_FILE
  }
];
