import api from "./axios";

type Theme = {
  author_address: string;
  id: number;
  media: {
    previews: string[]
  }
  user_id: string; // author
  name: string;
  earn: number;
  zip_link: string;
};

type getPurchasedThemesRes = {
  data: Theme[];
};

export async function getPurchasedThemes(): Promise<getPurchasedThemesRes> {
  return api(`/themes/purchased`, {}, { method: "GET" }).then((res) => res);
}
