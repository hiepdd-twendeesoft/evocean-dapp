import TabBar from "@/components/tabBar";
import { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <TabBar />
      {children}
    </div>
  );
};

export default AppLayout;
