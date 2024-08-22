import { CHOOSE_PRODUCT_PAGE_SIZE, INITIAL_PAGE } from '@/constants/base';
import { COLOR } from '@/constants/common';
import { ItemTheme } from '@/models/common.type';
import { fetchThemes } from '@/services/common.service';
import { EQueryKeys } from '@/types/common';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Modal, Pagination } from 'antd';
import { uniqBy } from 'lodash';
import { useCallback, useState } from 'react';
import { IProductSelect } from './CollectionForm';
import ProductCard from './ProductCard';

interface IChooseProductModalProps {
  open: boolean;
  themeSelect: IProductSelect[];
  handleSetThemSelect: (v: IProductSelect[]) => void;
  onClose: () => void;
}

export default function ChooseProductModal({
  open,
  onClose,
  handleSetThemSelect,
  themeSelect
}: IChooseProductModalProps) {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [productSelect, setProductSelect] = useState<IProductSelect[]>(
    themeSelect || []
  );
  const { data: productResponse } = useQuery({
    queryKey: [EQueryKeys.YOUR_PRODUCTS, { page }],
    queryFn: () =>
      fetchThemes({
        page: page,
        take: CHOOSE_PRODUCT_PAGE_SIZE
      }),
    placeholderData: keepPreviousData
  });

  const selectAll = useCallback(() => {
    setProductSelect(preState => {
      const allThemeInPage = productResponse?.data.map(theme => {
        return {
          id: theme.id,
          thumbnail: theme.media.thumbnail
        };
      });
      const uniqThemeSelect: any = uniqBy(
        [...preState, ...(allThemeInPage || [])],
        'id'
      );
      return uniqThemeSelect;
    });
  }, [productResponse?.data]);

  const handleClickProductCard = useCallback(
    (theme: ItemTheme) => {
      const productExists = productSelect.find(p => p.id === theme.id);
      if (productExists) {
        setProductSelect(pre => pre.filter(item => item.id !== theme.id));
      } else
        setProductSelect(
          pre =>
            [...pre, { id: theme.id, thumbnail: theme.media.thumbnail }] as any
        );
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
      thumbnail: item.thumbnail
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
        <Button
          onClick={selectAll}
          className="text-indigo-600 border-indigo-600 hover:!text-indigo-600 hover:!border-indigo-600 rounded-xl font-semibold px-[40px] py-[9px] h-[42px] text-[16px] leading-6"
        >
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
