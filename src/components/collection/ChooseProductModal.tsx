import { INITIAL_PAGE, CHOOSE_PRODUCT_PAGE_SIZE } from '@/constants/base';
import { fetchThemes } from '@/services/common.service';
import { EQueryKeys } from '@/types/common';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Modal, Pagination } from 'antd';
import React, { useCallback, useState } from 'react';
import ProductCard from './ProductCard';
import { ItemTheme } from '@/models/common.type';
import { COLOR } from '@/constants/common';
import { IProductSelect } from './CollectionForm';
import { ucs2 } from 'punycode';

interface IChooseProductModalProps {
  open: boolean;
  themeSelect: IProductSelect[];
  handleSetThemSelect: (v: IProductSelect[]) => void;
  onClose: () => void;
}

export default function ChooseProductModal({
  open,
  onClose,
  handleSetThemSelect
}: IChooseProductModalProps) {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [productSelect, setProductSelect] = useState<ItemTheme[]>([]);

  const { data: productResponse } = useQuery({
    queryKey: [EQueryKeys.YOUR_PRODUCTS, { page }],
    queryFn: () =>
      fetchThemes({
        page: page,
        take: CHOOSE_PRODUCT_PAGE_SIZE
      }),
    placeholderData: keepPreviousData
  });

  const handleClickProductCard = useCallback(
    (theme: ItemTheme) => {
      const productExists = productSelect.find(p => p.id === theme.id);
      if (productExists) {
        setProductSelect(pre => pre.filter(item => item.id !== theme.id));
      } else setProductSelect(pre => [...pre, theme]);
    },
    [productSelect]
  );

  const checkProductSelected = useCallback(
    (productId: number) => {
      const productExists = productSelect.find(p => p.id === productId);
      return !!productExists;
    },
    [productSelect]
  );

  const handleSaveProduct = useCallback(() => {
    const productSelectList: IProductSelect[] = productSelect.map(item => ({
      id: item.id,
      thumbnail: item.media.thumbnail
    }));
    handleSetThemSelect(productSelectList);
    onClose();
  }, [handleSetThemSelect, onClose, productSelect]);
  return (
    <Modal
      maskClosable
      onCancel={onClose}
      closeIcon={false}
      centered
      open={open}
      width={1000}
      onClose={onClose}
      footer={
        <div>
          <div className="flex justify-center">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: COLOR.primary
                }
              }}
            >
              <Pagination
                showLessItems
                defaultCurrent={page}
                onChange={page => {
                  setPage(page);
                }}
                total={productResponse?.total}
                showSizeChanger={false}
              />
            </ConfigProvider>
          </div>
          <div
            onClick={handleSaveProduct}
            className="flex justify-center mt-[32px]"
          >
            <Button className="h-[42px] bg-indigo-600 hover:!bg-indigo-600 text-white hover:!border-indigo-600 border-indigo-600 hover:!text-white font-semibold w-[195px] text-[16px] rounded-xl">
              Save
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex justify-between">
        <h2 className="text-[30px] font-bold ">Your products</h2>
        <Button className="text-indigo-600 border-indigo-600 hover:!text-indigo-600 hover:!border-indigo-600 rounded-xl font-semibold px-[40px] py-[9px] h-[42px] text-[16px] leading-6">
          Select all
        </Button>
      </div>
      <div className="border-t mt-4" />
      <div className="my-[24px] grid grid-cols-2 gap-[20px]">
        {productResponse?.data.map(product => (
          <div onClick={() => handleClickProductCard(product)} key={product.id}>
            <ProductCard
              isActive={checkProductSelected(product.id)}
              product={product}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
