import { FC, Fragment } from "react";
import InfoItem from "./InfoItem";

interface IProps {
  template_features?: string[];
  figma_features?: string[];
  overview?: string;
}

const TabOverView: FC<IProps> = ({
  template_features,
  figma_features,
  overview,
}) => {
  return (
    <Fragment>
      <p className="text-base font-normal text-gray-800">{overview}</p>
      <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
        Template features
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {template_features?.map((item, index) => (
          <InfoItem key={index} title={item} icon="" />
        ))}
      </div>
      <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
        Figma features
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {figma_features?.map((item, index) => (
          <InfoItem key={index} title={item} icon="" />
        ))}
      </div>
    </Fragment>
  );
};

export default TabOverView;
