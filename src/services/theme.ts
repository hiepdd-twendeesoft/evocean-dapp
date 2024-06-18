import { TCreateTheme } from "@/models/theme.type";
import api, { getAxiosInstance } from "./axios";


export async function createTheme(body: TCreateTheme | any): Promise<any> {
  const axios = await getAxiosInstance()
    // return api(`/theme/creating`, body, { method: "POST" }).then((res) => res);

    const formData = new FormData();
    for (const property in body) {
      if(body?.[property]) {
        if(property === 'previews') {
          for(const file of body[property]) {
            formData.append(property, file);
          }
        } else {
          formData.append(property, body[property]);
        }
      }
    }
    return axios.post('/themes/creating', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}
