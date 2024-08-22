import { IFeatureTag } from '@/models/theme.type';
import api from './axios';
import { ApiThemes } from './route';
import { IAccountInfo } from '@/models/user.type';

export function fetchUserService(): Promise<IAccountInfo[]> {
  return api(`${ApiThemes.users}`, null, {
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => err);
}
