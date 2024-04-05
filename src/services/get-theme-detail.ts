import { ItemTheme } from "@/models/common.type";
import api from "./axios";

export const getTheme = (themeId: number): Promise<ItemTheme> =>
  api(`/themes/${themeId}`, null, { method: "GET" }).then((res) => res.data);
