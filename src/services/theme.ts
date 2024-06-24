import { ITheme, IThemeItem, TCreateTheme } from "@/models/theme.type";
import api, { getAxiosInstance } from "./axios";
import { FetchThemeParams, IUploadThemeRes, ItemTheme, ListData, TUploadTheme } from "@/models/common.type";
import { ApiThemes } from "./route";


// export async function createTheme(body: TCreateTheme | any): Promise<any> {
//   const axios = await getAxiosInstance()
//     const formData = new FormData();
//     for (const property in body) {
//       if(body?.[property]) {
//         console.log(property, body[property])
//         if(property === 'previews' || property === 'figma_features' || property === 'template_features') {
//           for(const item of body[property]) {
//             formData.append(property, item);
//           }
//         } else {
//           formData.append(property, body[property]);
//         }
//       }
//     }
//     return axios.post(ApiThemes.createProducts, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
// }


export async function createTheme(body: TCreateTheme | any): Promise<any> {
    return api(ApiThemes.createProducts, body);
}

// export async function updateTheme(themeId: number, body: TCreateTheme | any): Promise<any> {
//   const axios = await getAxiosInstance()
//     const formData = new FormData();
//     for (const property in body) {
//       if(body?.[property]) {
//         console.log(property, body[property])
//         if(property === 'previews' || property === 'figma_features' || property === 'template_features') {
//           for(const item of body[property]) {
//             formData.append(property, item);
//           }
//         } else {
//           formData.append(property, body[property]);
//         }
//       }
//     }
//     return axios.put(`${ApiThemes.updateProduct}/${themeId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
// }

export async function updateTheme(themeId: number, body: TCreateTheme | any): Promise<any> {
    return api(`${ApiThemes.updateProduct}/${themeId}`, body, {
      method: "PUT"
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

export async function uploadTheme(body: TUploadTheme | any): Promise<{
  data: IUploadThemeRes
}> {
  console.log('here')
  const axios = await getAxiosInstance()
    const formData = new FormData();
    for (const property in body) {
      if(body?.[property]) {
        if(property === 'previews') {
          for(const item of body[property]) {
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
  api(`${ApiThemes.deleteProduct}/${themeId}`, null, { method: "DELETE" }).then((res) => res.data);