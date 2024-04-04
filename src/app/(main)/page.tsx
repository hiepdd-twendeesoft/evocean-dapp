import ItemNft from "@/components/itemNft";
import Category from "./components/Category";

const HomePage = () => {
  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-slate-800 my-12 max-w-[70%] lg:text-6xl md:text-4xl">
        Design resouces to optimize for creative work flow
      </h2>
      <Category />
      <h2 className="text-gray-900 text-2xl font-semibold mb-4 lg:text-4xl md:text-3xl">
        Featured
      </h2>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-10 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
        <ItemNft />
      </div>
      <div className="justify-center flex mt-8">
        <button className="bg-indigo-600 h-[42px] rounded-[12px] px-[18px] hover:scale-105 duration-200">
          <p className="text-base font-semibold text-white">View more</p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
