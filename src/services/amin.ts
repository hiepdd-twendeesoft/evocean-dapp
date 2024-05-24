import { OAuthLoginDto } from "@/models/auth.type";
import api from "./axios";

export async function getDashboard(): Promise<any> {
  return api(`/dashboard/overview`, {}, { method: "GET"}).then((res) => res);
}   