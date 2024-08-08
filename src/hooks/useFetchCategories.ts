import { fetchThemeCategories } from '@/services/common.service';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export default function useFetchCategories() {
  return useQuery({
    queryKey: [EQueryKeys.PRODUCT_CATEGOIES],
    queryFn: () => fetchThemeCategories()
  });
}
