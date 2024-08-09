import {
  FetchThemeParams,
  ItemTheme,
  IThemCategory,
  ListData
} from '@/models/common.type';
import api from './axios';
import { ApiThemes } from './route';

export function fetchThemes(
  params: FetchThemeParams
): Promise<ListData<ItemTheme>> {
  return api(ApiThemes.fetchThemes, null, {
    method: 'GET',
    params
  })
    .then(res => res.data)
    .catch(err => err);
}
export function fetchThemeCategories(): Promise<IThemCategory[]> {
  return api(ApiThemes.fetchThemeCategories, null, {
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => err);
}
export function fetchThemeTags(): Promise<IThemCategory[]> {
  return api(ApiThemes.fetchThemeTags, null, {
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => err);
}
