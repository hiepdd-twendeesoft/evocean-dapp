'use client';

import { FC, Fragment, lazy, useState } from 'react';
import InfoItem from './InfoItem';
import TabNavigation from '@/components/tabNavigation';
import { TAB_DETAIL } from '@/constants/data';
import { useControlTab } from '@/hooks/useControlTab';
import { TransactionTheme } from '@/models/common.type';
import {
  IThemeFeatureType,
  IThemeTag,
  IThemeType,
  ThemeFeature
} from '@/models/theme.type';
import Image from 'next/image';

const TabOverView = lazy(
  () => import('@/app/(main)/detail/components/TabOverview')
);
const TabTransaction = lazy(
  () => import('@/app/(main)/detail/components/TabTransaction')
);

interface IProps {
  tags?: IThemeTag[];
  highlight?: string[];
  format?: IThemeType[];

  themeFeatures?: ThemeFeature[];
  overview?: string;
  Transactions?: TransactionTheme[];
}

const ContentTab: FC<IProps> = ({
  tags,
  highlight,
  format,
  themeFeatures,
  overview,
  Transactions
}) => {
  const { indexTab, handleChangeTab } = useControlTab();

  return (
    <Fragment>
      <TabNavigation
        tabs={TAB_DETAIL}
        indexActive={indexTab}
        handleChange={handleChangeTab}
      />
      <div className="flex items-start justify-between mt-8 max-md:flex-col">
        <div className={`w-[${indexTab === 1 ? 100 : 53}%] max-md:w-[100%]`}>
          {indexTab === 0 && (
            <TabOverView themeFeatures={themeFeatures} overview={overview} />
          )}
          {indexTab === 1 && <TabTransaction Transactions={Transactions} />}
        </div>
        <div
          className={`w-[43%] max-md:w-[100%] ${
            indexTab === 1 ? 'hidden' : ''
          }`}
        >
          <h4 className="text-lg font-medium text-gray-900 mb-4">Tags</h4>
          <div className="flex items-center flex-wrap">
            {tags?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-[32px] rounded-[16px] px-3 bg-gray-100 flex items-center justify-center mr-4 mb-3"
                >
                  <img
                    src={'/assets/image/global.svg'}
                    alt="global"
                    className="w-[16px]"
                  />
                  <p className="text-sm font-medium text-gray-800 ml-1">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Highlight
          </h4>
          <Fragment>
            {highlight?.map((item, index) => {
              return (
                <InfoItem
                  key={index}
                  title={item}
                  icon="/assets/icon/check-icon.svg"
                />
              );
            })}
          </Fragment>
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Format
          </h4>
          <div className="flex flex-col gap-3">
            {format?.map(item => {
              return (
                <div className="flex items-center gap-8 ml-2" key={item.id}>
                  <Image alt="icon" width={20} height={20} src={item.iconUrl} />
                  <span className="text-gray-600 text-[16px] font-medium">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            Support
          </h4>
          <InfoItem
            title="How templates work"
            icon="/assets/icon/info-icon.svg"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ContentTab;
