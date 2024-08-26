import api from './axios';
import {
  AuthResponse,
  OAuthLoginDto,
  OAuthLoginWithWalletDto
} from '@/models/auth.type';

export async function googleLogin(body: OAuthLoginDto): Promise<AuthResponse> {
  return api(`/auth/sign-in-google`, body, { method: 'POST' }).then(
    res => res.data
  );
}

export async function walletLogin(
  body: OAuthLoginWithWalletDto
): Promise<AuthResponse> {
  return api(`/auth/sign-in-wallet`, body, { method: 'POST' }).then(
    res => res.data
  );
}
