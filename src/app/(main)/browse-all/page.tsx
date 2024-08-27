'use client';

import ItemNft from '@/components/itemNft';
import LabelCategory from '../components/LabelCategory';
import { useFetchTheme } from '@/hooks/useFetchTheme';
import { Fragment } from 'react';

const BrowseAllPage = () => {
  const { data } = useFetchTheme({ page: 1, take: 8, listing: true });

  return (
    <div className="min-h-[500px] mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-gray-900 my-12 max-w-[70%] lg:text-6xl md:text-4xl">
        Browse and find your suitable products
      </h2>
      <LabelCategory
        label="Coded template"
        href="./category-detail/coded-template"
      />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                sale={item.sale}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <LabelCategory label="Branding" href="./category-detail/branding" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                sale={item.sale}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <LabelCategory
        label="Presentation"
        href="./category-detail/presentation"
      />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                sale={item.sale}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <LabelCategory label="UI Kit" href="./category-detail/ui-kit" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        {data?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                sale={item.sale}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BrowseAllPage;
