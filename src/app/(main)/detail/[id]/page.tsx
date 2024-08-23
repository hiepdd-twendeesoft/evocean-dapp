// eslint-disable-next-line react-hooks/exhaustive-deps
'use client';

import ItemNft from '@/components/itemNft';
import { Route } from '@/constants/route';
import useConvertDollar from '@/hooks/useConvertDollar';
import { useFetchTheme } from '@/hooks/useFetchTheme';
import { useTx } from '@/hooks/useTx';
import { buyTheme } from '@/services/buy-theme';
import { getTheme } from '@/services/get-theme-detail';
import { RootState } from '@/store/slices';
import { shortenAddress } from '@/utils/helper';
import { lamportsToSol } from '@/utils/lamports-to-sol';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ContentTab from '../components/ContentTab';
import ModalBuyOwnership, {
  modalBuyOwnershipControl,
  refModalBuyOwnership
} from '../components/ModalBuyOwnership';
import Preview from '../components/Preview';

const DetailThemePage = () => {
  const router = useRouter();
  const { provider } = useTx();
  const wallet = useAnchorWallet();
  const { push } = useRouter();
  const { isLogin, accountInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const { id } = useParams<{ id: string }>();

  const { data, refetch } = useQuery({
    queryKey: ['get-theme', id],
    queryFn: () => getTheme(Number(id))
  });

  const usdAmount = useConvertDollar(lamportsToSol(data?.sale?.price));

  const isBuy = data?.owner_addresses?.some(
    item => item === wallet?.publicKey?.toBase58()
  );

  const isOwner = data?.author_address === wallet?.publicKey?.toBase58();

  const handleBuyOwner = () => {
    if (isOwner) {
      return toast('You already own the product');
    }
    if (!wallet?.publicKey) {
      return toast.warn('Please connect your wallet before purchasing');
    }
    modalBuyOwnershipControl.show();
  };

  const { data: listThemes } = useFetchTheme({
    page: 1,
    take: 10,
    listing: true
  });

  const handleBuy = () => {
    if (!data?.sale || !data.author_address) {
      toast.warn('sale not found');
      return;
    }
    // check if the buyer has been added to the owner_address array
    if (data.owner_addresses.includes(id)) {
      toast.warn('You have already bought this theme');
      return;
    }
    router.push(
      `/detail/${id}/payment/eth/${data?.author_address}/${usdAmount}`,
      { scroll: false }
    );
  };

  const handleBuySol = async () => {
    try {
      if (!wallet?.publicKey) {
        return toast.warn('Please connect your wallet before purchasing');
      }
      if (isBuy || isOwner) {
        return toast(
          isOwner
            ? 'You already own the product'
            : 'You have purchased the product'
        );
      }
      if (!data?.sale) {
        toast.warn('sale not found');
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: new PublicKey(data.author_address),
          lamports: Number(data.sale.price)
        })
      );

      const signal = await provider.sendAndConfirm(transaction);

      await buyTheme({
        buyer: provider.wallet.publicKey.toBase58(),
        theme_id: data.id
      });
      refetch();
      toast.success('Buy success');
      push(Route.PROFILE);
    } catch (error) {
      console.error('error buy');
      console.error(error);
      toast.error('Failed to buy this theme');
    }
  };

  const handleLivePreview = () => {
    window.open(data?.linkPreview);
  };

  const themeFormat = useMemo(
    () => data?.themeFeatures.map(item => item.type),
    [data?.themeFeatures]
  );

  const handleGetSignature = async (url: string): Promise<string> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/themes/payment?url=${url}`
    );
    return response.url as string;
  };

  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <ModalBuyOwnership
        ref={refModalBuyOwnership}
        author_address={data?.author_address}
        token_mint={data?.token_mint}
        theme_id={data?.id}
        name={data?.name}
        image={data?.media?.previews?.[0]}
        priceOwner={lamportsToSol(data?.listing?.price)}
        refetch={refetch}
      />
      <div className="flex items-start justify-between max-md:flex-col mb-12">
        <div className="w-[53%] max-md:w-[100%]">
          <Preview data={data?.media?.previews} />
          {data?.linkPreview && (
            <div className="flex items-center mt-6">
              <button
                onClick={handleLivePreview}
                className="flex items-center justify-center h-[50px] rounded-[12px] bg-indigo-50 flex-1 hover:bg-indigo-100"
              >
                <p className="text-base font-semibold text-indigo-700">
                  Live preview
                </p>
                <img
                  src={'/assets/image/global.svg'}
                  alt="eye"
                  className="w-[18px] ml-2"
                />
              </button>
            </div>
          )}
        </div>
        <div className="w-[43%] max-md:mt-4 max-md:w-[100%]">
          <div className="flex items-center flex-wrap mb-6">
            {data?.categories.map((item, index) => (
              <div
                key={index}
                className="h-[28px] bg-indigo-100 rounded-[12px] px-[16px] mr-[12px] flex items-center justify-center"
              >
                <p className="text-sm text-indigo-800 font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <h2 className="text-4xl text-gray-900 font-semibold mb-2">
            {data?.name}
          </h2>
          {(isBuy || isOwner) && (
            <p className="text-sm text-green-600 font-medium">
              {isOwner ? 'You are the owner' : 'Purchased'}
            </p>
          )}
          <p className="text-gray-600 text-base font-normal mt-1 line-clamp-2">
            {data?.overview}
          </p>
          <div className="bg-gray-100 rounded-[20px] p-[12px] mt-8">
            <div className="flex items-center">
              {isLogin && (
                <div
                  onClick={() => {
                    handleBuy();
                  }}
                  className="h-[50px] flex-1 flex items-center justify-center rounded-[12px]  border-[1px] cursor-pointer hover:bg-indigo-800 duration-200 bg-indigo-600"
                >
                  <p className="text-white font-semibold text-base mr-3">
                    Buy for {usdAmount}$
                  </p>
                </div>
              )}
              <div className="h-[50px] flex border-indigo-600 border-[1px] flex-1 items-center justify-center cursor-pointer rounded-[12px] hover:scale-105 duration-200">
                <p
                  className="text-base font-semibold text-indigo-600"
                  onClick={handleBuySol}
                >
                  Buy for {lamportsToSol(data?.sale?.price)} SOL
                </p>
                <img
                  src={'/assets/image/SOL.svg'}
                  alt="SOL"
                  className="w-[20px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 mb-4">
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-gray-900">sale</p>
                <img
                  src={'/assets/image/sale.svg'}
                  alt="sale"
                  className="w-[14px] mx-[4px]"
                />
                <p className="text-sm font-medium text-gray-900">312</p>
              </div>
              <img
                src={'/assets/image/arrow-right.svg'}
                alt="arrow"
                className="w-[14px]"
              />
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-gray-900">Volume</p>
                <img
                  src={'/assets/image/SOL.svg'}
                  alt="SOL"
                  className="w-[14px] mx-[4px]"
                />
                <p className="text-sm font-medium text-gray-900">222.3</p>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t-gray-200 border-t-[1px] pt-10 flex items-center">
            <p className="text-sm text-gray-500 font-medium">Owner</p>
            <img
              src={'/assets/image/SOL.svg'}
              alt="SOL"
              className="w-[20px] mx-[8px]"
            />
            <p className="text-sm text-gray-900 font-medium">
              {shortenAddress(data?.author_address || '')}
            </p>
          </div>
          <p className="text-base font-normal text-gray-600 mt-4">
            Interested in this product and eager to collaborate and earn with
            the creator?
          </p>
          <div className="flex items-center mt-2">
            <button className="mr-3" onClick={handleBuyOwner}>
              <p className="text-lg font-semibold text-indigo-600">
                Buy Ownership
              </p>
            </button>
            <p className="text-sm font-medium text-gray-900">
              From $ {useConvertDollar(lamportsToSol(data?.listing?.price))}
            </p>
            <p className="text-sm font-medium text-gray-500 mx-4">or</p>
            <div className="flex items-center">
              <img
                src={'/assets/image/SOL.svg'}
                alt="SOL"
                className="w-[14px] mr-[4px]"
              />
              <p className="text-sm font-medium text-gray-900">
                {lamportsToSol(data?.listing?.price)}
              </p>
            </div>
          </div>
          <button className="flex items-center mt-6 group">
            <img
              src={'/assets/icon/info-icon.svg'}
              alt="icon"
              className="w-[20px]"
            />
            <p className="text-base font-medium text-gray-600 ml-2 group-hover:text-indigo-600">
              What is ownership for investor?
            </p>
          </button>
          <button className="flex items-center mt-2 group">
            <img
              src={'/assets/icon/info-icon.svg'}
              alt="icon"
              className="w-[20px]"
            />
            <p className="text-base font-medium text-gray-600 ml-2 group-hover:text-indigo-600">
              How to buy and use the template?
            </p>
          </button>
        </div>
      </div>
      <ContentTab
        highlight={data?.media?.highlight}
        tags={data?.tags}
        format={themeFormat}
        themeFeatures={data?.themeFeatures}
        overview={data?.overview}
        Transactions={data?.Transactions}
      />
      <div className="flex items-center justify-between border-t-gray-200 border-t-[1px] mt-14">
        <h2 className="text-gray-900 text-1xl font-semibold mb-4 md:text-2xl mt-12">
          Other template products
        </h2>
        <button className="flex items-center">
          <p className="text-sm text-indigo-600 font-medium mr-[4px]">
            View all
          </p>
          <img
            src={'/assets/image/arrow-right.svg'}
            alt="arrow"
            className="w-[14px]"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        {listThemes?.pages?.map((page, indexPage) => (
          <Fragment key={indexPage}>
            {page.data.map((item, index) => (
              <ItemNft
                key={index}
                id={item.id}
                name={item.name}
                sale={item.sale}
                image={item.media?.previews?.[0]}
                listing={item.listing}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DetailThemePage;
