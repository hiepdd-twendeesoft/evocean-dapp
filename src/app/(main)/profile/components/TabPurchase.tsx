import ItemNft from "@/components/itemNft";
import { memo } from "react";

const TabPurchase = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8 mt-10">
      <ItemNft />
      <ItemNft />
      <ItemNft />
      <ItemNft />
      <ItemNft />
      <ItemNft />
      <ItemNft />
      <ItemNft />
    </div>
  );
};

export default TabPurchase;
