import { Aside } from '@/components/admin/Aside';
import { FC, PropsWithChildren } from 'react';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full flex">
      <div className="w-[16%]">
        <Aside />
      </div>
      <div className="w-[84%] 2xl:w-[78%] p-[32px]">{children}</div>
    </div>
  );
};

export default AppLayout;
