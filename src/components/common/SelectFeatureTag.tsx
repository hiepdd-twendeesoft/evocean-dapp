import { fetchFeatureTag } from '@/services/common.service';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { difference, iteratee } from 'lodash';
import React, { useMemo, useState } from 'react';

interface ISelectCustomProps extends BaseOptionType {
  currentValue?: number[];
  tagClassname?: string;
  typeId: number;
}

export default function SelectFeatureTag({
  onChange,
  options,
  currentOptionValue,
  currentValue,
  typeId,
  tagClassName = 'bg-purple-200 text-purple-500',
  ...props
}: ISelectCustomProps) {
  // const currentOptions = useMemo(() => {
  //   return options.filter(item => currentValue?.includes(item.value));
  // }, [currentValue, options]);

  const { data: tagOptions } = useQuery({
    queryKey: [typeId],
    queryFn: () => fetchFeatureTag(typeId)
  });

  const tagIds = useMemo(
    () => tagOptions?.map(item => item.id) || [],
    [tagOptions]
  );
  const oldData = useMemo(
    () => difference(currentValue || [], tagIds),
    [currentValue, tagIds]
  );

  const optionSelect = useMemo(
    () => tagOptions?.filter(item => currentValue?.includes(item.id)),
    [currentValue, tagOptions]
  );

  return (
    <div>
      <Select
        size="large"
        mode="multiple"
        style={{ width: '100%' }}
        onChange={e => {
          onChange([...oldData, ...e]);
        }}
        {...props}
        value={optionSelect?.map(item => ({
          label: item.name,
          value: item.id
        }))}
        tokenSeparators={[',']}
        options={tagOptions?.map(item => ({
          label: item.name,
          value: item.id
        }))}
        showSearch={false}
        placeholder="Type a tag and press enter..."
      />
      <div className="mt-[20px] flex flex-wrap gap-[12px]">
        {optionSelect?.map(item => (
          <div
            key={item.id}
            className={`px-[24px] py-[8px] border-[1px] border-gray-300 rounded-lg  w-fit flex gap-3`}
          >
            <img alt="icon" src={item.iconUrl} />
            <span> {item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
