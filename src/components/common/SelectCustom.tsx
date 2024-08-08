import { Select } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { iteratee } from 'lodash';
import React, { useMemo } from 'react';

export interface ISelectOption {
  value: number;
  label: string;
}
interface ISelectCustomProps extends BaseOptionType {
  options: ISelectOption[];
  currentValue: number[];
  tagClassname?: string;
}

export default function SelectCustom({
  onChange,
  options,
  currentOptionValue,
  currentValue,
  tagClassName = 'bg-purple-200 text-purple-500',
  ...props
}: ISelectCustomProps) {
  const currentOptions = useMemo(() => {
    return options.filter(item => currentValue?.includes(item.value));
  }, [currentValue, options]);

  console.log('tagClassname', tagClassName);

  return (
    <div>
      <Select
        size="large"
        {...props}
        mode="multiple"
        style={{ width: '100%' }}
        onChange={e => {
          onChange(e);
        }}
        tokenSeparators={[',']}
        options={options}
        showSearch={false}
        placeholder="Type a tag and press enter..."
      />
      <div className="mt-[20px] flex flex-wrap gap-[12px]">
        {currentOptions.map(item => (
          <div
            key={item.value}
            className={`px-[24px] py-[8px] ${tagClassName} rounded-lg  w-fit`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
