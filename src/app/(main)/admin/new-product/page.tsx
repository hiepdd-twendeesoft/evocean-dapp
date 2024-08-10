'use client';

import SelectCustom from '@/components/common/SelectCustom';
import useFetchCategories from '@/hooks/useFetchCategories';
import {
  EThemeStatus,
  TCreateTheme,
  TCreateThemeSchema
} from '@/models/theme.type';
import { uploadTheme } from '@/services/theme';
import { createThemeAction } from '@/store/actions/theme';
import { useAppDispatch } from '@/store/store';
import { EProductTab } from '@/types/product';
import { createThemeSchema } from '@/validation/admin/theme.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CheckIcon from '../../../../../public/assets/icon/CheckIcon';
import DoubleLine from '../../../../../public/assets/icon/DoubleLineIcon';
import useFetchAllTags from '@/hooks/useFetchAllTags';
import UploadFile from '@/components/common/UploadFile';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';
import { CloseOutlined } from '@ant-design/icons';
import { NAV_LINKS } from '@/types/common';

function AddProductPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control
  } = useForm<TCreateThemeSchema>({
    resolver: yupResolver(createThemeSchema)
  });
  const [theme, setTheme] = useState<string>();
  const [file, setFile] = useState<string>();
  const [fileLocal, setFileLocal] = useState<File>();
  const [themeFile, setThemeFile] = useState<File>();
  const [coverImage, setCoverImage] = useState<ImageListType>([]);
  const [detailImages, setDetailImages] = useState<ImageListType>([]);
  const [fullPreviews, setFullPreViewImages] = useState<ImageListType>([]);
  const [thumbnail, setThumbnail] = useState<string>();
  const [tab, setTab] = useState<EProductTab>(EProductTab.OVERVIEW);
  const [status, setStatus] = useState<EThemeStatus>(EThemeStatus.DRAFT);
  const router = useRouter();

  const onSubmit: SubmitHandler<TCreateThemeSchema> = async data => {
    switch (true) {
      case !theme:
        message.error({ content: 'Product is required' });
        break;
      case !file:
        message.error({ content: 'Theme file is required' });
        break;

      case !thumbnail:
        message.error({ content: 'Thumbnail is required' });

      case isEmpty(coverImage):
        message.error({ content: 'Cover image is required' });

      case isEmpty(detailImages):
        message.error({ content: 'Detail image is required' });

      case isEmpty(fullPreviews):
        message.error({ content: 'Preview image is required' });
        break;
      default:
        break;
    }
    const coverImageCreated: any = await uploadTheme({
      thumbnail: coverImage[0].file
    });

    const previewsImages: any = await uploadTheme({
      previews: fullPreviews.map(item => item.file)
    });

    const detailImage: any = await uploadTheme({
      previews: detailImages.map(item => item.file)
    });

    const template_features = data.template_features
      .split(', ')
      .map(item => item.trim());
    const figma_features = data.figma_features
      .split(', ')
      .map(item => item.trim());

    const createThemeDto: TCreateTheme = {
      ...data,
      zip_link: theme,
      thumbnail_link: thumbnail,
      template_features,
      figma_features,
      status,
      coverImages: [coverImageCreated.data.thumbnail],
      fullPreviewImages: previewsImages.data.previews,
      detailImages: detailImage.data.previews
    };

    try {
      const result = await dispatch(createThemeAction(createThemeDto)).unwrap();
      message.success('Create theme successfully');
      router.push('/admin/dashboard', { scroll: false });
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    }
  };

  const onError = (error: any) => {
    for (const item of Object.values(error) as any) {
      message.error(item['message']);
    }
  };

  const productImageAcceptTypes = ['JPG', 'PNG', 'GIF'];
  const handleChangeThumbnail = async (file: any) => {
    try {
      const result = await uploadTheme({
        thumbnail: file
      });
      setThumbnail(result.data.thumbnail);
      message.success('Update thumbnail successfully');
    } catch (err) {
      message.error('Update thumbnail failed');
    }
  };
  const handleFileTheme = async (
    e: ChangeEvent<HTMLInputElement>,
    allowFileTypes: string[]
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const isMatchMediaType = allowFileTypes.includes(file.type);

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split('/')[1])
      ?.join('/')
      ?.toUpperCase();

    if (isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`);
      return;
    }
    try {
      const result = await uploadTheme({
        zip_file: e.target.files[0]
      });
      setThemeFile(e.target.files[0]);
      setTheme(result.data.zip_file);
      message.success('Update theme zip successfully');
    } catch (err) {
      message.error('Update theme zip failed');
    }
  };

  const handleChangeThemeZip = async (
    e: ChangeEvent<HTMLInputElement>,
    allowFileTypes: string[]
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const isMatchMediaType = allowFileTypes.includes(file.type);

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split('/')[1])
      ?.join('/')
      ?.toUpperCase();

    if (isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`);
      return;
    }
    try {
      const result = await uploadTheme({
        zip_file: e.target.files[0]
      });
      setThemeFile(e.target.files[0]);
      setTheme(result.data.zip_file);
      message.success('Update theme zip successfully');
    } catch (err) {
      message.error('Update theme zip failed');
    }
  };
  const handleFileThemeZip = async (
    e: ChangeEvent<HTMLInputElement>,
    allowFileTypes: string[]
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const isMatchMediaType = allowFileTypes.includes(file.type);

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split('/')[1])
      ?.join('/')
      ?.toUpperCase();

    if (isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`);
      return;
    }
    try {
      const result = await uploadTheme({
        zip_file: e.target.files[0]
      });
      setFileLocal(e.target.files[0]);
      setFile(result.data.zip_file);
      message.success('Update theme zip successfully');
    } catch (err) {
      message.error('Update theme zip failed');
    }
  };

  const getColorIcon = useCallback((value: string[], index: number) => {
    return isEmpty(value ? value[index] : '') ? '#E4E4E7' : '#4338CA';
  }, []);

  const { data: themeCategories } = useFetchCategories();
  const { data: themeTags } = useFetchAllTags();

  const NavLinkComponent = () => {
    return (
      <ul className="flex items-center font-medium mt-[32px] gap-10">
        {NAV_LINKS.map((item, index) => (
          <li
            key={index}
            onClick={() => setTab(item.value)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <span
              className={`w-[40px] flex items-center justify-center h-[40px] border border-1 rounded-[50%] ${
                item.value === tab
                  ? 'border-primary text-primary'
                  : 'border-[#6B7280] text-[#6B7280]'
              }`}
            >
              {index + 1}
            </span>
            <p
              className={`${
                item.value === tab ? 'text-primary' : 'text-[#6B7280]'
              }`}
            >
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Add new product
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <button
            onClick={() => setStatus(EThemeStatus.DRAFT)}
            className="px-[17px] py-[9px] rounded-[14px] border border-[#D1D5DB] border-1 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            Save as draft
          </button>
          <button
            onClick={() => setStatus(EThemeStatus.PENDING)}
            className="bg-primary text-white px-[17px] py-[9px] rounded-[14px] ml-4"
          >
            Submit for review
          </button>
        </div>
      </div>
      <NavLinkComponent />
      {tab === EProductTab.OVERVIEW && (
        <div className="flex gap-8">
          <div className="basis-3/5">
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                Product type
              </h1>
              <ul className="flex gap-4">
                <li className="flex w-full cursor-pointer justify-start p-[20px] bg-[#EEF2FF] border-primary border-2 rounded-[8px]">
                  <label
                    className="flex gap-2 cursor-pointer"
                    htmlFor="single-theme"
                  >
                    <div className="pt-1">
                      <img
                        alt="img"
                        src={'/assets/image/admin/upload-single.svg'}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Single product</h3>
                      <p className="mt-1">
                        {theme && themeFile
                          ? `${themeFile.name} (${themeFile.size}MB)`
                          : `Any set of files to download that contain a single type of category`}
                      </p>
                    </div>
                  </label>
                  <Input
                    id="single-theme"
                    type="file"
                    className="hidden"
                    onChange={e => handleChangeThemeZip(e, ['application/zip'])}
                  />
                </li>
              </ul>
            </div>
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                Product detail
              </h1>
              <ul className="flex flex-col gap-4">
                <li className="w-full">
                  <h2>Name</h2>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                        type="text"
                        {...field}
                        status={errors.name?.message ? 'error' : ''}
                        placeholder={errors.name?.message || ''}
                      />
                    )}
                  />
                  <span className="text-[#64748B]">Give it a catchy name</span>
                </li>
                <li className="w-full mt-2">
                  <h2>Description</h2>
                  <Controller
                    name="overview"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        className="w-[100%] h-[100px] px-[13px] py-[9px] text-[#64748B] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                        {...field}
                        status={errors.overview?.message ? 'error' : ''}
                        placeholder={
                          errors.overview?.message ||
                          'Something about your product...'
                        }
                      />
                    )}
                  />
                </li>
              </ul>
            </div>
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                Pricing
              </h1>
              <ul className="flex flex-col gap-4">
                <li className="w-full">
                  <h2>Selling pricing</h2>
                  <div className="flex h-[44px] border-[#D1D5DB] border-2 rounded-[8px]">
                    <div className="w-[62px] h-full flex justify-center items-center bg-[#EEF2FF] rounded-l-[8px]">
                      SOL
                    </div>
                    <Controller
                      name="selling_price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                          type="text"
                          {...field}
                          status={errors.selling_price?.message ? 'error' : ''}
                          placeholder={errors.selling_price?.message}
                        />
                      )}
                    />
                  </div>
                  <span className="text-[#64748B]">
                    How much do you want to sell this?
                  </span>
                </li>
                <li className="w-full">
                  <h2>Percentage of Ownership</h2>
                  <div className="flex h-[44px]  border-[#D1D5DB] border-2 rounded-[8px]">
                    <div className="w-[62px] h-full flex justify-center items-center bg-[#EEF2FF] rounded-l-[8px]">
                      %
                    </div>
                    <Controller
                      name="owner_price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                          type="text"
                          {...field}
                          status={errors.owner_price?.message ? 'error' : ''}
                          placeholder={errors.owner_price?.message}
                        />
                      )}
                    />
                  </div>
                  <span className="text-[#64748B]">
                    How much would you pass with product?
                  </span>
                </li>
                <li className="w-full">
                  <h2>Ownership price</h2>
                  <div className="flex h-[44px]  border-[#D1D5DB] border-2 rounded-[8px]">
                    <div className="w-[62px] h-full flex justify-center items-center bg-[#EEF2FF] rounded-l-[8px]">
                      SOL
                    </div>
                    <Controller
                      name="percentageOfOwnership"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                          type="text"
                          {...field}
                          status={errors.owner_price?.message ? 'error' : ''}
                          placeholder={errors.owner_price?.message}
                        />
                      )}
                    />
                  </div>
                  <span className="text-[#64748B]">
                    How much would you pass with product?
                  </span>
                </li>

                <li className="w-full">
                  <div className="flex">
                    <img alt="" src={'/assets/image/admin/note.svg'} />
                    <p className="pl-1">What is ownership?</p>
                  </div>
                  <div className="flex mt-1">
                    <img alt="img" src={'/assets/image/admin/note.svg'} />
                    <p className="pl-1">How my author price being share?</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-2/5">
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                Thumbnail
              </h1>

              <ul className="flex gap-4 flex-col">
                <FileUploader
                  handleChange={handleChangeThumbnail}
                  name="file"
                  types={productImageAcceptTypes}
                />
                {thumbnail && (
                  <img alt="img" className="w-[80%] h-full" src={thumbnail} />
                )}
              </ul>
            </div>
            <div>
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                File type included
              </h1>
              <ul className="flex gap-4 flex-wrap">
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/figma.svg'}
                  />
                  <h2>Figma</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/framer.svg'}
                  />
                  <h2>Framer</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/blender.svg'}
                  />
                  <h2>Blender</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/html.svg'}
                  />
                  <h2>HTML</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/powerpoint.svg'}
                  />
                  <h2>Powerpoint</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/photoshop.svg'}
                  />
                  <h2>Photoshop</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    alt="img"
                    className="w-[16px]"
                    src={'/assets/image/admin/illustrator.svg'}
                  />
                  <h2>Illustrator</h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === EProductTab.FEATURES && (
        <div className="flex justify-between gap-[150px] mt-10">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="font-medium">Highlight Features</p>
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  <Controller
                    name="highlight"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <>
                          {new Array(6).fill('').map((_, index) => (
                            <Input
                              key={index}
                              value={value ? value[index] : ''}
                              onChange={e => {
                                const newValue = e.target.value;
                                const draft = value ? [...value] : [];
                                draft[index] = newValue;
                                onChange(draft);
                              }}
                              className="h-[46px]"
                              prefix={
                                <CheckIcon
                                  color={getColorIcon(value ?? [], index)}
                                />
                              }
                              suffix={
                                <DoubleLine
                                  color={getColorIcon(value ?? [], index)}
                                />
                              }
                            />
                          ))}
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium">Link preview</p>
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  <Controller
                    name="linkPreview"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <>
                          <Input
                            onChange={onChange}
                            value={value}
                            className="h-[46px]"
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium">Select Category</p>
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <SelectCustom
                          options={
                            themeCategories?.map(item => ({
                              label: item.name,
                              value: item.id
                            })) || []
                          }
                          currentValue={value || []}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium">Select Tags</p>
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      console.log(value, value);
                      return (
                        <SelectCustom
                          options={
                            themeTags?.map(item => ({
                              label: item.name,
                              value: item.id
                            })) || []
                          }
                          currentValue={value || []}
                          onChange={onChange}
                          tagClassName="bg-indigo-200 text-indigo-800"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <ul className="flex flex-1 flex-col gap-4">
            <li className="w-full">
              <h2 className="font-medium mb-6">Template features</h2>
              <Controller
                name="template_features"
                control={control}
                render={({ field }) => (
                  <Input
                    className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                    type="text"
                    {...field}
                    status={errors.template_features?.message ? 'error' : ''}
                    placeholder={errors.template_features?.message || ''}
                  />
                )}
              />
            </li>
            <li className="w-full mt-2">
              <h2 className="font-medium">Figma features</h2>
              <Controller
                name="figma_features"
                control={control}
                render={({ field }) => (
                  <Input
                    className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                    type="text"
                    {...field}
                    status={errors.figma_features?.message ? 'error' : ''}
                    placeholder={errors.figma_features?.message || ''}
                  />
                )}
              />
            </li>
          </ul>
        </div>
      )}

      {EProductTab.UPLOAD_IMAGE === tab && (
        <div className="flex flex-col gap-[60px]">
          <div>
            <h1 className="my-6 text-[#111827] text-xl font-medium">Cover</h1>

            <ul className="flex gap-4 flex-col">
              <ReactImageUploading
                acceptType={productImageAcceptTypes}
                multiple
                value={[]}
                maxNumber={1}
                dataURLKey="dataUrl"
                onChange={e => {
                  setCoverImage(e);
                }}
              >
                {({ onImageUpload, dragProps }) => (
                  <div onClick={onImageUpload} {...dragProps}>
                    {isEmpty(coverImage) ? (
                      <UploadFile />
                    ) : (
                      <Image
                        {...dragProps}
                        width={500}
                        height={500}
                        src={coverImage && coverImage[0]?.dataUrl}
                        alt="cover"
                        className="w-full max-h-[600px] object-cover rounded-[20px]"
                      />
                    )}
                  </div>
                )}
              </ReactImageUploading>
            </ul>
          </div>
          <div>
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Detail images (4-8 required approval)
            </h1>
            <ul className="flex gap-4 flex-col">
              <ReactImageUploading
                multiple
                value={[]}
                maxNumber={8}
                dataURLKey="dataUrl"
                acceptType={productImageAcceptTypes}
                onChange={data =>
                  setDetailImages(preState => [...preState, ...data])
                }
              >
                {({ onImageUpload, dragProps }) => (
                  <div>
                    <div onClick={onImageUpload} {...dragProps}>
                      <UploadFile />
                    </div>

                    <div className="flex flex-wrap gap-[20px] mt-[40px]">
                      {detailImages?.map((image, index) => (
                        <div
                          key={index}
                          className="w-[calc(50%-10px)] max-h-[400px] relative"
                        >
                          <div
                            onClick={() =>
                              setDetailImages(preState =>
                                preState.filter(
                                  item => item.file?.name !== image.file?.name
                                )
                              )
                            }
                            className="bg-white rounded-full w-[30px] h-[30px] absolute top-0 right-0 flex justify-center items-center cursor-pointer border-[1px] border-solid"
                          >
                            <CloseOutlined className="text-gray-500" />
                          </div>
                          <Image
                            key={index}
                            width={500}
                            height={500}
                            src={image && image?.dataUrl}
                            alt="cover"
                            className="object-cover w-full rounded-[20px] max-h-[400px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ReactImageUploading>
            </ul>
          </div>
          <div>
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Full preiviews
            </h1>
            <ul className="flex gap-4 flex-col">
              <ReactImageUploading
                acceptType={productImageAcceptTypes}
                multiple
                value={[]}
                maxNumber={8}
                dataURLKey="dataUrl"
                onChange={data =>
                  setFullPreViewImages(preState => [...preState, ...data])
                }
              >
                {({ onImageUpload, dragProps }) => (
                  <div>
                    <div onClick={onImageUpload} {...dragProps}>
                      <UploadFile />
                    </div>

                    <div className="flex flex-wrap gap-[20px] mt-[40px]">
                      {fullPreviews?.map((image, index) => (
                        <div
                          key={index}
                          className="w-[calc(50%-10px)] max-h-[400px] relative"
                        >
                          <div
                            onClick={() =>
                              setFullPreViewImages(preState =>
                                preState.filter(
                                  item => item.file?.name !== image.file?.name
                                )
                              )
                            }
                            className="bg-white rounded-full w-[30px] h-[30px] absolute top-0 right-0 flex justify-center items-center cursor-pointer border-[1px] border-solid"
                          >
                            <CloseOutlined className="text-gray-500" />
                          </div>
                          <Image
                            key={index}
                            width={500}
                            height={500}
                            src={image && image?.dataUrl}
                            alt="cover"
                            className="object-cover w-full rounded-[20px] max-h-[400px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ReactImageUploading>
            </ul>
          </div>
        </div>
      )}

      {EProductTab.UPLOAD_FILE === tab && (
        <div className="flex flex-col gap-[60px]">
          <div>
            <h1 className="my-6 text-[#111827] text-xl font-medium">File</h1>

            <label htmlFor="file-theme" className="flex gap-4 flex-col">
              <UploadFile
                title="Drag & drop file or click on to upload."
                isShowDesctiption={false}
              />
              {fileLocal && file && (
                <div className="border-dashed border-[1px] border-gray-300 px-[100px] rounded-[20px] py-[25px] flex items-center gap-[46px]">
                  <Image
                    alt="zip-file-icon"
                    width={50}
                    height={50}
                    src={'/assets/icon/zip-file.svg'}
                  />
                  <div>{`${fileLocal.name} (${fileLocal.size}MB)`}</div>
                </div>
              )}

              <Input
                id="file-theme"
                type="file"
                className="hidden"
                onChange={e => handleFileThemeZip(e, ['application/zip'])}
              />
            </label>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddProductPage;
