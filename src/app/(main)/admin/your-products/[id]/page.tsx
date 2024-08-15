'use client';

import ProductForm from '@/components/product/ProductForm';
import { fetchTheme } from '@/services/theme';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

function AddProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: themeDetail } = useQuery({
    queryKey: [EQueryKeys.THEME_DETAIL, id],
    queryFn: () => fetchTheme(Number(id))
  });

  return <ProductForm themeDetail={themeDetail} />;
}

export default AddProductPage;
