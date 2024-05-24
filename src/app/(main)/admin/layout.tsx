import { Aside } from "@/components/admin/Aside";
import Footer from "@/components/footer";
import TabBar from "@/components/tabBar";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full bg-white flex">
      <div className="w-[16%]">
        <Aside />
      </div>
      <div className="w-[78%] p-5">{children}</div>
    </div>
  );
};

export default AppLayout;
