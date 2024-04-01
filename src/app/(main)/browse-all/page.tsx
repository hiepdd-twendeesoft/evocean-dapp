"use client";

import ItemNft from "@/components/itemNft";
import LabelCategory from "../components/LabelCategory";

const BrowseAllPage = () => {
  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-slate-800 my-12 max-w-[70%] lg:text-6xl md:text-4xl">
        Browse and find your suitable products
      </h2>
      <LabelCategory label="UI Kit" href="./category-detail/ui-kit" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
      </div>
      <LabelCategory label="Coded template" href="./category-detail/coded-template" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
      </div>
      <LabelCategory label="Template" href="./category-detail/template" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-4 md:grid-cols-3 mb-8">
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
      </div>
    </div>
  );
};

export default BrowseAllPage;
