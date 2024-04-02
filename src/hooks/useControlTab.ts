import { useCallback, useState } from "react";

export const useControlTab = (tabDefault: number = 0) => {
  const [indexTab, setIndexTab] = useState<number>(tabDefault);

  const handleChangeTab = useCallback((index: number) => {
    setIndexTab(index);
  }, []);

  return {
    indexTab,
    handleChangeTab,
  };
};
