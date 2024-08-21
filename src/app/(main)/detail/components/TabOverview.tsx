import { FC, Fragment } from 'react';
import InfoItem from './InfoItem';
import { ThemeFeature } from '@/models/theme.type';

interface IProps {
  themeFeatures?: ThemeFeature[];
  figma_features?: string[];
  overview?: string;
}

const TabOverView: FC<IProps> = ({
  themeFeatures,

  overview
}) => {
  return (
    <Fragment>
      <p className="text-base font-normal text-gray-800">{overview}</p>
      {themeFeatures?.map((item, index) => (
        <div key={index}>
          <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
            {item.type.name}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {item.features.map(feature => (
              <InfoItem
                key={feature.id}
                title={feature.name}
                icon={item.type.iconUrl}
              />
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default TabOverView;
