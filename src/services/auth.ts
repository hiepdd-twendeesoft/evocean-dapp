import api from './axios';
import { OAuthLoginDto } from '@/models/auth.type';

export async function googleLogin(body: OAuthLoginDto): Promise<any> {
  return api(`/auth/sign-in-google`, body, { method: 'POST' }).then(res => res);
}

export async function walletLogin(body: { address: string }): Promise<any> {
  return api(`/auth/sign-in-wallet`, body, { method: 'POST' }).then(res => res);
}
