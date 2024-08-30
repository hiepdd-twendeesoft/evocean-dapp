import ItemNft from '@/components/itemNft';
import { Route } from '@/constants/route';
import { useFetchTheme } from '@/hooks/useFetchTheme';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback } from 'react';

const TabPurchase = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { data } = useFetchTheme(
    { page: 1, take: 60, owner: publicKey?.toBase58() },
    !publicKey
  );

  const handleItem = useCallback(
    (id: number) => {
      router.push(`${Route.DETAIL_PRODUCT}/${id}`);
    },
    [router]
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8 mt-10">
      {data?.pages?.map((page, indexPage) => (
        <Fragment key={indexPage}>
          {page.data.map((item, index) => (
            <ItemNft
              key={index}
              id={item.id}
              name={item.name}
              image={item.media?.previews?.[0]}
              handleItem={handleItem}
              owner_price={item.owner_price}
              selling_price={item.selling_price}
              hidePrice
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default TabPurchase;
