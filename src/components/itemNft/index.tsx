'use client';

import { Route } from '@/constants/route';
import useConvertDollar from '@/hooks/useConvertDollar';
import { ItemTheme } from '@/models/common.type';
import { lamportsToSol } from '@/utils/lamports-to-sol';
import { toFormatPrice } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { FC, memo } from 'react';

interface IItemNftProps extends Partial<ItemTheme> {
  handleItem?: (id: number) => void;
  image?: string;
  hidePrice?: boolean;
}

const ItemNft: FC<IItemNftProps> = ({
  handleItem,
  image,
  name,
  id,
  sale,
  hidePrice,
  listing,
  categories
}) => {
  const router = useRouter();

  const priceDollar = useConvertDollar(lamportsToSol(sale?.price));

  const _handleItem = () => {
    if (handleItem && id) {
      return handleItem(id);
    }
    router.push(`${Route.DETAIL_THEME}/${id}`);
  };

  return (
    <div
      onClick={_handleItem}
      className="mb-[12px] cursor-pointer hover:-translate-y-1 duration-200"
    >
      <img
        src={image || '/assets/image/theme.png'}
        alt="Theme"
        className="w-[100%] rounded-[16px] border-gray-300 border-[1px] h-[260px] object-cover"
      />
      <h2 className="text-base text-gray-900 font-semibold mt-[12px] line-clamp-1">
        {name || 'DataWise Framer - Multi-Layout SaaS Framer Template'}
      </h2>
      <p className="text-[#565E76] text-sm font-normal mr-2 line-clamp-1">
        {categories?.map(item => `${item} `)}
      </p>

      {!hidePrice && (
        <div className="items-center flex border-gray-200 border-[1px] rounded-[12px] mt-[12px] h-[44px]">
          <div className="flex item-center w-[50%] justify-center px-[12px]">
            <div className="flex items-center mr-1">
              <img
                src={'/assets/image/SOL.svg'}
                alt="SOL"
                className="w-[14px] h-[14px]"
              />
              <p className="font-medium text-gray-900 text-sm ml-[4px]">
                {lamportsToSol(sale?.price)}
              </p>
            </div>
            <p className="font-medium text-gray-500 text-sm">
              (${toFormatPrice(priceDollar)})
            </p>
          </div>
          <div className="bg-gray-200 w-[1px] h-[100%]" />
          <div className="flex items-center w-[50%] justify-center">
            <p className="font-medium text-gray-900 text-sm mr-[3px]">
              Ownership:
            </p>
            <img
              src={'/assets/image/SOL.svg'}
              alt="SOL"
              className="w-[14px] h-[14px]"
            />
            <p className="font-medium text-gray-900 text-sm ml-[4px]">
              {lamportsToSol(listing?.price)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ItemNft);
