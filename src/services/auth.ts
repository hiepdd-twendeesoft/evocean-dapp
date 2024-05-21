import { ItemTheme } from "@/models/common.type";
import api from "./axios";
import { AuthResponse, OAuthLoginDto } from "@/models/auth.type";

// export const signInGoogle = (): Promise<any> =>
//   api(`/auth/sign-in-google`, null, { method: "POST" }).then((res) => res);

export async function googleLogin(body: OAuthLoginDto): Promise<any> {
  return api(`/auth/sign-in-google`, body, { method: "POST" }).then((res) => res);
  // return http.post(AuthApiEndPoints.GoogleLogin, body);
}