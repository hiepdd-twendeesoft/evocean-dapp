export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface OAuthLoginDto {
  access_token: string;
}
