import { EProductTab } from './product';

export enum EQueryKeys {
  PRODUCT_CATEGOIES = 'product_categories',
  PRODUCT_TAGS = 'product_tags',
  THEME_DETAIL = 'theme_detail'
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
