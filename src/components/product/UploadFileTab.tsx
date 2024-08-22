import React, { ChangeEvent } from 'react';
import UploadFile from '../common/UploadFile';
import Image from 'next/image';
import Input from 'antd/es/input/Input';
import { Switch } from 'antd';
import ConfigProvider, { ConfigContext } from 'antd/es/config-provider';

interface IUploadFileTab {
  fileLocal?: File;
  themeFile?: string;
  handleFileThemeZip: (
    e: ChangeEvent<HTMLInputElement>,
    allowFileTypes: string[]
  ) => void;
}

export default function UploadFileTab({
  fileLocal,
  themeFile,
  handleFileThemeZip
}: IUploadFileTab) {
  return (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h1 className="my-6 text-[#111827] text-xl font-medium">File</h1>

        <div className="flex gap-4 flex-col">
          <label htmlFor="file-theme">
            <UploadFile
              title="Drag & drop file or click on to upload."
              isShowDesctiption={false}
            />
          </label>
          {(fileLocal || themeFile) && (
            <div className="border-dashed border-[1px] border-gray-300 px-[100px] rounded-[20px] py-[25px] flex items-center gap-[46px]">
              <div className="flex items-center gap-[46px] flex-1">
                <Image
                  alt="zip-file-icon"
                  width={50}
                  height={50}
                  src={'/assets/icon/zip-file.svg'}
                />
                <div className="flex-1">
                  {themeFile && (
                    <span>{`${themeFile?.split(RegExp('%2..*%2F(.*?)?alt'))?.[1]}`}</span>
                  )}
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      {fileLocal && (
                        <>
                          <Image
                            alt="zip-file-icon"
                            width={20}
                            height={20}
                            src={'/assets/icon/check-green.svg'}
                          />

                          <span className="text-gray-400 font-semibold text-[16px]">
                            {fileLocal.size} MB
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <input
            id="file-theme"
            type="file"
            className="hidden"
            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            onChange={e => handleFileThemeZip(e, ['application/zip'])}
          />
        </div>
      </div>
    </div>
  );
}
