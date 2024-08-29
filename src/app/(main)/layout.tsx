import Footer from '@/components/footer';
import TabBar from '@/components/tabBar';
import { FC, PropsWithChildren } from 'react';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full bg-white">
      <TabBar />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
