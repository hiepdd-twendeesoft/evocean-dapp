import { FC, memo } from "react";

interface IProps {
  title: string;
  icon: string;
  styleText?: string;
}

const InfoItem: FC<IProps> = ({ title, icon, styleText = "" }) => {
  return (
    <div className="flex items-center mb-2">
      {icon && (
        <img
          src={`/assets/icon/${icon}.svg`}
          alt={icon}
          className="w-[18px] mr-2"
        />
      )}
      <p className={`text-base font-medium text-gray-600 ${styleText}`}>
        {title}
      </p>
    </div>
  );
};

export default memo(InfoItem);
