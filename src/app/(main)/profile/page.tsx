"use client";

import TabNavigation from "@/components/tabNavigation";
import { TAB_PROFILE } from "@/constants/data";
import { useCallback, useState, lazy } from "react";
import ModalOrder, { refModalOrder } from "./components/ModalOrder";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";

const TabPurchase = lazy(
  () => import("@/app/(main)/profile/components/TabPurchase")
);
const TabOwner = lazy(() => import("@/app/(main)/profile/components/TabOwner"));

const ProfilePage = () => {
  const { publicKey } = useWallet();
  const [indexTab, setIndexTab] = useState<number>(0);

  const handleChangeTab = useCallback((index: number) => {
    setIndexTab(index);
  }, []);

  return (
    <div className="min-h-[500px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <div className="flex items-center mb-14">
        <img
          src={"/assets/image/SOL.svg"}
          alt="SOL"
          className="w-[100px] h-[100px] rounded-[50px]"
        />
        <div className="ml-5">
          <h2 className="text-2xl font-semibold text-gray-900 line-clamp-1 mb-3">
            {publicKey ? shortenAddress(publicKey.toBase58()) : "Unnamed"}
          </h2>
          <p className="text-[16px] text-gray-600">
            Dreaming in digital, living in code. Coffee first, then adventures.
          </p>
        </div>
      </div>
      <TabNavigation
        indexActive={indexTab}
        tabs={TAB_PROFILE}
        handleChange={handleChangeTab}
      />
      {indexTab === 0 && <TabPurchase />}
      {indexTab === 1 && <TabOwner />}
      <ModalOrder ref={refModalOrder} />
    </div>
  );
};

export default ProfilePage;
