"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Aside = () => {
  const router = useRouter();
  const pathName = usePathname();

  console.log('pathName', pathName)

  const adminAside = [
    {
      title: "Dashboard",
      icon: "/assets/image/admin/dashboard.svg",
      url: "/admin/dashboard",
    },
    {
      title: "Your products",
      icon: "/assets/image/admin/your-products.svg",
      url: "/admin/your-products",
    },
    {
      title: "Owned products",
      icon: "/assets/image/admin/owned-products.svg",
      url: "/admin/owned-products",
    },
    {
      title: "Sales",
      icon: "/assets/image/admin/sales.svg",
      url: "/admin/sales",
    },
    {
      title: "Payouts",
      icon: "/assets/image/admin/payouts.svg",
      url: "/admin/payouts",
    },
    {
      title: "Account setting",
      icon: "/assets/image/admin/setting.svg",
      url: "/admin/setting",
    },
  ];

  const handleClickNewProduct = () => {
    router.push("/admin/new-product", { scroll: false });
  };

  return (
    <aside
      id="default-sidebar"
      className="mt-[65px] fixed top-0 left-0 z-40 w-[16%] h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="relative h-full px-4 py-5 overflow-y-auto border-r border-solid border-[1px]">
        <ul className="space-y-2">
          {adminAside.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className={`flex items-center p-[8px] text-[#4B5563] text-ellipsis text-base not-italic font-medium leading-6 hover:text-[#111827] hover:bg-[#F3F4F6] ${pathName === item.url ? 'bg-[#F3F4F6]' : 'bg-[#fff]'} `}
                // className={`flex items-center p-[8px] text-[#4B5563] text-ellipsis text-base not-italic font-medium leading-6 hover:text-[#111827] hover:bg-[#F3F4F6] ${pathName === item.url ? 'bg-[#F3F4F6]' : 'bg-[#fff]'} `}
              >
                <img src={item.icon} alt="eye" className="w-[18px] ml-2" />
                <span className="ms-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleClickNewProduct}
            className="bg-[#4F46E5] text-[#fff] font-semibold absolute bottom-[10%] py-4 px-20 rounded-[18px]"
          >
            New product
          </button>
        </div>
      </div>
    </aside>
  );
};
