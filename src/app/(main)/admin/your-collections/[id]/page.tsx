'use client';
import CollectionForm from '@/components/collection/CollectionForm';
import { fetchCollection } from '@/services/collection';
import { EQueryKeys } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

export default function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: collectionDetail } = useQuery({
    queryKey: [EQueryKeys.COLLECTION_DETAIL, id],
    queryFn: () => fetchCollection(Number(id))
  });
  return <CollectionForm collectionDetail={collectionDetail} />;
}
