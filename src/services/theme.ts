import { ITheme, IThemeItem, TCreateTheme } from "@/models/theme.type";
import api, { getAxiosInstance } from "./axios";
import { FetchThemeParams, ItemTheme, ListData } from "@/models/common.type";
import { ApiThemes } from "./route";


export async function createTheme(body: TCreateTheme | any): Promise<any> {
  const axios = await getAxiosInstance()
    const formData = new FormData();
    for (const property in body) {
      if(body?.[property]) {
        console.log(property, body[property])
        if(property === 'previews' || property === 'figma_features' || property === 'template_features') {
          for(const item of body[property]) {
            formData.append(property, item);
          }
        } else {
          formData.append(property, body[property]);
        }
      }
    }
    return axios.post(ApiThemes.createProducts, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

export async function updateTheme(themeId: number, body: TCreateTheme | any): Promise<any> {
  const axios = await getAxiosInstance()
    const formData = new FormData();
    for (const property in body) {
      if(body?.[property]) {
        console.log(property, body[property])
        if(property === 'previews' || property === 'figma_features' || property === 'template_features') {
          for(const item of body[property]) {
            formData.append(property, item);
          }
        } else {
          formData.append(property, body[property]);
        }
      }
    }
    return axios.put(`${ApiThemes.updateProduct}/${themeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

export async function fetchThemes(
  params: FetchThemeParams
): Promise<ListData<IThemeItem>> {
  return api(ApiThemes.fetchProducts, null, {
    method: "GET",
    params,
  })
    .then((res) => res.data)
    .catch((err) => err);
}

export const fetchTheme = (themeId: number): Promise<ITheme> =>
  api(`/themes/${themeId}`, null, { method: "GET" }).then((res) => res.data);
