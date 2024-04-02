import { FC, memo } from "react";

interface IProps {
  title: string;
  icon: string;
  styleText?: string;
}

const InfoItem: FC<IProps> = ({ title, icon, styleText = "" }) => {
  return (
    <div className="flex items-center mb-2">
      <img src={`/assets/icon/${icon}.svg`} alt={icon} className="w-[18px]" />
      <p className={`text-base font-medium text-gray-600 ml-2 ${styleText}`}>
        {title}
      </p>
    </div>
  );
};

export default memo(InfoItem);
