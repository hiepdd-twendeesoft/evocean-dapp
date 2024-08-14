import useConvertDollar from '@/hooks/useConvertDollar';
import { IThemeItem } from '@/models/theme.type';
import { deleteTheme } from '@/services/theme';
import { EQueryKeys } from '@/types/common';
import { lamportsToSol } from '@/utils/lamports-to-sol';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, message } from 'antd';
import Link from 'next/link';

export type ProductItemProps = {
  product: IThemeItem;
  key: number;
};

export const ProductItem = ({ product, key }: ProductItemProps) => {
  const dollarPrice = useConvertDollar(lamportsToSol(product.price));
  const dollarEarning = useConvertDollar(lamportsToSol(product.earning));

  const queryClient = useQueryClient();

  const confirm = async () => {
    try {
      await deleteTheme(product.id);
      message.success('Delete theme successfully');
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.YOUR_PRODUCTS] });
    } catch (err) {
      message.error('Delete theme failed');
    }
  };

  return (
    <tr key={key} className="border-b border-neutral-200">
      <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center cursor-pointer justify-between">
        <div className="flex gap-4">
          <img className="w-[90px]" src={product.thumbnail} alt="thumbnail" />
          <div>
            <h2>{product.name}</h2>
            <p className="text-[#6B7280]">Owned: 20/05/2024</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Link
            className="flex items-center gap-2"
            href={`/admin/your-products/${product.id}`}
          >
            <h2 className="text-[#4F46E5] text-[14px]">Edit</h2>
            <img src={'/assets/image/admin/edit.svg'} alt="edit" />
          </Link>
          <Popconfirm
            title="Title"
            description="Do you want to delete this product"
            onConfirm={confirm}
            onOpenChange={() => console.log('open change')}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-[#4F46E5] text-[14px]">Delete</h2>
              <img
                className="w-[20px] h-[20px]"
                src={'/assets/image/admin/delete.svg'}
                alt="delete"
              />
            </div>
            {/* <Button type="primary">Open Popconfirm with Promise</Button> */}
          </Popconfirm>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <h2>$ {dollarPrice}</h2>
        <p className="text-[#6B7280]">{lamportsToSol(product?.price)} SOL</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">{product.sales}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <h2>$ {dollarEarning}</h2>
        <p className="text-[#6B7280]">{lamportsToSol(product?.earning)} SOL</p>
      </td>
    </tr>
  );
};
