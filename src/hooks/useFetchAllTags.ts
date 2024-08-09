import { fetchThemeTags } from '@/services/common.service';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export default function useFetchAllTags() {
  return useQuery({
    queryKey: [EQueryKeys.PRODUCT_TAGS],
    queryFn: () => fetchThemeTags()
  });
}
