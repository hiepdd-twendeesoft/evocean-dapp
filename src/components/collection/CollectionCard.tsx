import { ICollection } from '@/models/collection.type';
import { isEmpty } from 'lodash';
import Image from 'next/image';

interface ICollectionCardProps {
  collection: ICollection;
  isActive?: boolean;
}

export default function CollectionCard({
  collection,
  isActive
}: ICollectionCardProps) {
  return (
    <div
      className={`border h-[140px] rounded-lg flex items-center px-[24px] py-[12px] gap-[12px] ${isActive && ' border-indigo-600 bg-indigo-50 border-[2px]'}`}
    >
      <div>
        <Image
          alt="collection"
          className="rounded-md w-[154px] h-[115px] object-cover"
          width={154}
          height={115}
          src={collection?.thumbnail}
        />
      </div>
      <div className="flex-1 h-full overflow-auto no-scrollbar">
        <p className="text-[16px] font-medium leading-6">{collection.name}</p>
        {!isEmpty(collection?.collectionCategories) && (
          <div className="flex gap-1">
            <span className="text-[12px]">Category:</span>

            <div className="flex gap-2 flex-wrap">
              {collection?.collectionCategories?.map((item: any) => (
                <div
                  className="px-[8px] h-[24px] bg-purple-200 text-purple-500 rounded-lg  w-fit"
                  key={item?.category?.id}
                >
                  {item?.category?.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {!isEmpty(collection?.collectionTags) && (
          <div className="flex mt-2 gap-1">
            <span className="text-[12px]">Tag:</span>

            <div className="flex flex-wrap gap-2">
              {collection?.collectionTags?.map((item: any) => (
                <div
                  className="px-[8px] h-[24px] bg-indigo-200 text-indigo-800 rounded-lg  w-fit"
                  key={item?.tag?.id}
                >
                  {item?.tag?.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
