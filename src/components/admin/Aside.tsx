import Link from "next/link";
import { Route } from "@/constants/route";

export const Aside = () => {
  return (
    <aside
      id="default-sidebar"
      className="mt-[65px] fixed top-0 left-0 z-40 w-[16%] h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-500 border-r border-solid border-[1px]">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              className="flex items-center p-[8px] text-[#4B5563] text-ellipsis text-base not-italic font-medium leading-6 hover:text-[#111827] hover:bg-[#F3F4F6]"
            >
              <img
                src={"/assets/image/chart-bar.svg"}
                alt="eye"
                className="w-[18px] ml-2"
              />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href={Route.DASHBOARD_SALES}
              className="flex items-center p-[8px] text-[#4B5563] text-ellipsis text-base not-italic font-medium leading-6 hover:text-[#111827] hover:bg-[#F3F4F6]"
            >
              <img
                src={"/assets/image/sales.svg"}
                alt="eye"
                className="w-[18px] ml-2"
              />
              <span className="ms-3">Sales</span>
            </Link>
          </li>
          <li>
            <Link
              href={Route.DASHBOARD_PAYOUT}
              className="flex items-center p-[8px] text-[#4B5563] text-ellipsis text-base not-italic font-medium leading-6 hover:text-[#111827] hover:bg-[#F3F4F6]"
            >
              <img
                src={"/assets/image/payout.svg"}
                alt="eye"
                className="w-[18px] ml-2"
              />
              <span className="ms-3">Payout</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
