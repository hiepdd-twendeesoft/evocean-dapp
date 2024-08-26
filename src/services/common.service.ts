import {
  FetchThemeParams,
  ItemTheme,
  IThemCategory,
  ListData
} from '@/models/common.type';
import api from './axios';
import { ApiThemes } from './route';
import { IFeatureTag, IThemeFeatureType } from '@/models/theme.type';

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

export async function fetchYourThemes(): Promise<ItemTheme[]> {
  return api(`${ApiThemes.theme}/themes-by-user`, null, {
    method: 'GET'
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

export function fetchFeatureType(): Promise<IThemeFeatureType[]> {
  return api(`${ApiThemes.theme}/feature-type`, null, {
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => err);
}
export function fetchFeatureTag(typeId: number): Promise<IFeatureTag[]> {
  return api(`${ApiThemes.theme}/feature-tag/${typeId}`, null, {
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => err);
}
