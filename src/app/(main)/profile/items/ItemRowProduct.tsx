import { Route } from "@/constants/route";
import useConvertDollar from "@/hooks/useConvertDollar";
import { ItemTheme } from "@/models/common.type";
import { shortenAddress } from "@/utils/helper";
import { web3 } from "@coral-xyz/anchor";
import { useRouter } from "next/navigation";
import { FC, memo } from "react";

interface IProps extends Partial<ItemTheme> {
  image?: string;
}

const ItemRowProduct: FC<IProps> = ({
  name,
  image,
  author_address,
  sale,
  id,
  token_mint,
}) => {
  const router = useRouter();
  const price = sale
    ? (Number(sale.price) / web3.LAMPORTS_PER_SOL).toFixed(2)
    : 0;
  // const priceDollar = useConvertDollar(Number(price));

  const handleDetailProduct = () => {
    router.push(`${Route.DETAIL_PRODUCT}/${id}`);
  };

  const handleHistory = () =>
    window.open(
      `https://explorer.solana.com/address/${token_mint}?cluster=devnet`,
    );

  return (
    <tr className="border-b-[1px] border-b-gray-200">
      <th
        onClick={handleDetailProduct}
        className="flex items-center border-t-0 pl-4 pr-14 py-4 align-middle text-sm font-medium whitespace-nowrap text-left text-gray-900 cursor-pointer"
      >
        <img
          src={image || "/assets/image/theme.png"}
          alt="theme"
          className="h-[60px] rounded-[8px]"
        />
        <div className="ml-4">
          <h3 className="text-base font-medium text-gray-900 line-clamp-1 mb-1">
            {name}
          </h3>
          <p className="text-sm font-normal text-gray-500">Owned: 20/05/2024</p>
        </div>
      </th>
      <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap ">
        {shortenAddress(author_address || "")}
      </td>
      <td className="border-t-0 px-4 py-4 align-center text-[14px] text-gray-500 whitespace-nowrap">
        {price}
      </td>
      <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
        8
      </td>
      <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
        $5655
      </td>
      <td className="border-t-0 px-4 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
        <button
          onClick={handleHistory}
          className="bg-indigo-600 h-[38px] px-2 rounded-[12px] hover:-translate-y-1 duration-200"
        >
          <p className="text-sm text-white font-medium">View History</p>
        </button>
      </td>
    </tr>
  );
};

export default memo(ItemRowProduct);
