import { fetchUserService } from '@/services/user';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function useFetchUser() {
  return useQuery({
    queryKey: [EQueryKeys.USERS],
    queryFn: () => fetchUserService()
  });
}
