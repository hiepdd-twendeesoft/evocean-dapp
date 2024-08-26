import { IAccountInfo } from './user.type';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accountInfo?: IAccountInfo | null;
}

export interface OAuthLoginDto {
  access_token: string;
  user_id?: number;
  address?: string;
}

export interface OAuthLoginWithWalletDto {
  address: string;
  user_id?: number;
}
