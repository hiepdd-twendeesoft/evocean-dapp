const LIST_CATEGORY = [
  "NFT",
  "Web",
  "SaaS",
  "Blog",
  "Template",
  "UIKit",
  "Bot",
  "Tools",
  "App",
];

const Category = () => {
  return (
    <div className="flex items-center mb-20 mt-10 max-sm:mb-8 flex-wrap">
      {LIST_CATEGORY.map((item, index) => {
        return (
          <button
            key={index}
            className="max-sm:h-[36px] max-sm:px-[12px] mr-[12px] h-[44px] rounded-[12px] border-gray-200 border-[1px] px-[24px] group hover:bg-indigo-600 mb-[12px]"
          >
            <p className="text-gray-900 font-medium max-sm:text-[12px] text-[14px] group-hover:text-white">
              {item}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default Category;
