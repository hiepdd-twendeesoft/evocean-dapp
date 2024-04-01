import ItemNft from "@/components/itemNft";
import Category from "../../components/Category";
import { FC } from "react";

interface IProps {
  params: { categoryName: string };
}

const CategoryDetailPage: FC<IProps> = ({ params }) => {
  const { categoryName } = params;
  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-slate-800 mt-12 mb-2 max-w-[70%] lg:text-6xl md:text-4xl">
        {categoryName}
      </h2>
      <p className="text-base text-gray-600 font-normal max-w-[70%]">
        The ultimate shortcut in design. Equipped with ready-to-use UI
        components, you free to concentrate on the creative aspects of your
        projects without dedicating time to foundational elements.
      </p>
      <Category />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-3 md:grid-cols-2 mb-8">
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
