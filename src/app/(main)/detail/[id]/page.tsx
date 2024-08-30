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
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ContentTab from '../components/ContentTab';
import ModalBuyOwnership, {
  modalBuyOwnershipControl,
  refModalBuyOwnership
} from '../components/ModalBuyOwnership';
import Preview from '../components/Preview';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { isEmpty } from 'lodash';
const DetailThemePage = () => {
  const router = useRouter();
  const { provider } = useTx();
  const wallet = useAnchorWallet();
  const { push } = useRouter();
  const [visibleFullPreviews, setVisibleFullPreview] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { isLogin, accountInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const { id } = useParams<{ id: string }>();

  const { data, refetch } = useQuery({
    queryKey: ['get-theme', id],
    queryFn: () => getTheme(Number(id))
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const usdAmount = useConvertDollar(lamportsToSol(data?.selling_price));

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
          lamports: Number(data.selling_price)
        })
      );

      const signature = await provider.sendAndConfirm(transaction);

      await buyTheme({
        buyer: provider.wallet.publicKey.toBase58(),
        theme_id: data.id,
        tx_id: signature,
        currency: 'sol'
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
    <div className="min-h-[500px] mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 pt-16">
      <ModalBuyOwnership
        ref={refModalBuyOwnership}
        author_address={data?.author_address}
        token_mint={data?.token_mint}
        theme_id={data?.id}
        name={data?.name}
        image={data?.media?.previews?.[0]}
        priceOwner={lamportsToSol(data?.owner_price)}
        refetch={refetch}
      />
      <div className="flex items-start justify-between max-md:flex-col mb-12">
        <div className="w-[53%] max-md:w-[100%]">
          <Preview data={data?.media?.previews} />

          <PhotoSlider
            images={
              data?.media.previews?.map(item => ({ src: item, key: item })) ||
              []
            }
            visible={visibleFullPreviews}
            onClose={() => setVisibleFullPreview(false)}
            index={imageIndex}
            onIndexChange={setImageIndex}
          />
          <div className="flex w-full gap-[2%]">
            {!isEmpty(data?.media.previews) && (
              <div className="flex items-center mt-6 flex-1">
                <button
                  onClick={() => {
                    setVisibleFullPreview(true);
                    setImageIndex(0);
                  }}
                  className="flex items-center justify-center h-[50px] rounded-[12px] bg-indigo-50 flex-1 hover:bg-indigo-100"
                >
                  <p className="text-base font-semibold text-indigo-700">
                    Full preview
                  </p>
                  <img
                    src={'/assets/image/eye.svg'}
                    alt="eye"
                    className="w-[18px] ml-2"
                  />
                </button>
              </div>
            )}

            {data?.linkPreview && (
              <div className="flex items-center mt-6 flex-1">
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
        </div>

        <div className="w-[43%] max-md:mt-4 max-md:w-[100%]">
          <div className="flex items-center flex-wrap mb-6">
            {data?.categories.map((item, index) => (
              <div
                key={index}
                className="h-[28px] bg-indigo-100 rounded-[12px] px-[16px] mr-[12px] flex items-center justify-center mb-2"
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
            {isMounted && (
              <div className="flex items-center gap-2">
                {isLogin && (
                  <button
                    onClick={() => {
                      handleBuy();
                    }}
                    className="h-[50px] flex-1 flex items-center justify-center rounded-[12px]  border-[1px] cursor-pointer hover:bg-indigo-800 duration-200 bg-indigo-600"
                  >
                    <p className="text-white font-semibold text-base mr-3">
                      Buy for {usdAmount}$
                    </p>
                  </button>
                )}
                <button className="h-[50px] flex gap-[12px] border-indigo-600 border-[1px] flex-1 items-center justify-center cursor-pointer rounded-[12px] hover:scale-105 duration-200">
                  <p
                    className="text-base font-semibold text-indigo-600"
                    onClick={handleBuySol}
                  >
                    Buy for {lamportsToSol(data?.selling_price)} SOL
                  </p>
                  <img
                    src={'/assets/image/SOL.svg'}
                    alt="SOL"
                    className="w-[20px]"
                  />
                </button>
              </div>
            )}

            <div className="flex items-center mt-6 mb-4">
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-gray-900">Sale</p>
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
          <p className="text-base font-normal text-gray-600 mt-4 text-[16px]">
            Interested in this product and eager to collaborate and earn with
            the creator?
          </p>
          <div className="flex items-center mt-2">
            <button className="mr-1" onClick={handleBuyOwner}>
              <p className="text-lg font-semibold text-indigo-600">
                Buy Ownership
              </p>
            </button>
            <img
              src={'/assets/icon/identification.svg'}
              alt="SOL"
              className="w-[14px] mr-[4px]"
            />
            <div className="flex items-center">
              <p className="text-sm flex gap-[6px] font-medium text-gray-900">
                From{' '}
                <img
                  src={'/assets/image/SOL.svg'}
                  alt="SOL"
                  className="w-[14px] mr-[4px]"
                />{' '}
                {lamportsToSol(data?.owner_price)}
              </p>
            </div>
            <p className="text-sm text-gray-500 font-medium ml-[6px]">
              {`($ ${useConvertDollar(lamportsToSol(data?.owner_price))})`}
            </p>
          </div>
          <div className="mt-1 flex gap-1">
            <span className="text-gray-600">Or checkout</span>
            <span className="flex text-indigo-600">
              Product’s statistic{' '}
              <img
                src={'/assets/icon/chart-bar-square.svg'}
                alt="icon"
                className="w-[20px]"
              />
            </span>
            <span className="text-gray-600">before make the final decisin</span>
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
                owner_price={item.owner_price}
                selling_price={item.selling_price}
                image={item.media?.previews?.[0]}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DetailThemePage;
