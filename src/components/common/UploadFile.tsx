import Image from 'next/image';
import React from 'react';

export default function UploadFile() {
  return (
    <div className="cursor-pointer flex flex-col items-center w-full bg-gray-50 py-[100px] border-dashed border-[1px] border-gray-300 rounded-[20px]">
      <Image
        alt="uploadIcon"
        src={'/assets/icon/uploadIcon.svg'}
        width={40}
        height={50}
      />
      <span className="text-gray-600">
        Drag & drop image or click on to upload.{' '}
      </span>
      <span className="text-gray-600">
        Image 1208x840px size required in PNG or JPG format only.
      </span>
    </div>
  );
}
