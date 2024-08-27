import {
  IListThemeParams,
  ITheme,
  IThemeItem,
  TCreateTheme
} from '@/models/theme.type';
import api, { getAxiosInstance } from './axios';
import {
  FetchThemeParams,
  IUploadThemeRes,
  ListData,
  TUploadTheme
} from '@/models/common.type';
import { ApiThemes } from './route';

export async function createTheme(body: TCreateTheme): Promise<any> {
  return api(ApiThemes.createProducts, body);
}

export async function updateTheme({
  themeId,
  body
}: {
  themeId: number;
  body: Partial<TCreateTheme> | any;
}): Promise<any> {
  return api(`${ApiThemes.updateProduct}/${themeId}`, body, {
    method: 'PUT'
  });
}

export async function fetchThemes(
  params: FetchThemeParams
): Promise<ListData<IThemeItem>> {
  return api(ApiThemes.fetchProducts, null, {
    method: 'GET',
    params
  })
    .then(res => res.data)
    .catch(err => err);
}

export const fetchTheme = (themeId: number): Promise<ITheme> =>
  api(`/themes/${themeId}`, null, { method: 'GET' }).then(res => res.data);

export async function uploadTheme(body: TUploadTheme | any): Promise<{
  data: IUploadThemeRes;
}> {
  const axios = await getAxiosInstance();
  const formData = new FormData();
  for (const property in body) {
    if (body?.[property]) {
      if (property === 'previews') {
        for (const item of body[property]) {
          formData.append(property, item);
        }
      } else {
        formData.append(property, body[property]);
      }
    }
  }
  return axios.post(`${ApiThemes.uploadTheme}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const deleteTheme = (themeId: number): Promise<number> =>
  api(`${ApiThemes.deleteProduct}/${themeId}`, null, { method: 'DELETE' }).then(
    res => res.data
  );

export const listingThemeServece = ({
  themeId,
  nft_token
}: IListThemeParams): Promise<any> =>
  api(
    `${ApiThemes.theme}/listing/${themeId}`,
    { nft_token },
    { method: 'PATCH' }
  ).then(res => res.data);
