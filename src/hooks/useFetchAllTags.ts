import { fetchThemeTags } from '@/services/common.service';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export default function useFetchAllTags() {
  console.log('run1212');
  return useQuery({
    queryKey: [EQueryKeys.PRODUCT_TAGS],
    queryFn: () => fetchThemeTags()
  });
}
