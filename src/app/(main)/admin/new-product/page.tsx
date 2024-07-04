"use client";

import { SelectFeature } from "@/components/admin/SelectFeature";
import { Uploader } from "@/components/admin/Uploader";
import {
  EThemeStatus,
  TCreateTheme,
  TCreateThemeSchema,
} from "@/models/theme.type";
import { uploadTheme } from "@/services/theme";
import { createThemeAction } from "@/store/actions/theme";
import { useAppDispatch } from "@/store/store";
import { createThemeSchema } from "@/validation/admin/theme.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

function AddProductPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm<TCreateThemeSchema>({
    resolver: yupResolver(createThemeSchema),
  });
  const [theme, setTheme] = useState<string>();
  const [themeFile, setThemeFile] = useState<File>();
  const [previews, setPreviews] = useState<string[]>();
  const [thumbnail, setThumbnail] = useState<string>();
  const [features, setFeatures] = useState<any>([
    {
      name: "Auto Dark Theme available220+ ",
    },
    {
      name: "Fully responsive ",
    },
    {
      name: "Detailed inveractive component",
    },
    {
      name: "Many homepage layout",
    },
  ]);
  const [creators, setCreators] = useState<any>([]);
  const [tab, setTab] = useState<number>(0);
  const [status, setStatus] = useState<EThemeStatus>(EThemeStatus.DRAFT);
  const router = useRouter();
  const onSubmit: SubmitHandler<TCreateThemeSchema> = async (data) => {
    if (!theme) {
      message.error({
        content: "Product is required",
      });
      return;
    }

    if (!previews) {
      message.error({
        content: "Previews is required",
      });
      return;
    }

    if (!thumbnail) {
      message.error({
        content: "Thumbnail is required",
      });
      return;
    }

    const template_features = data.template_features
      .split(", ")
      .map((item) => item.trim());
    const figma_features = data.figma_features
      .split(", ")
      .map((item) => item.trim());

    const createThemeDto: TCreateTheme = {
      ...data,
      zip_link: theme,
      previews_links: previews,
      thumbnail_link: thumbnail,
      template_features,
      figma_features,
      status,
    };

    try {
      const result = await dispatch(createThemeAction(createThemeDto)).unwrap();
      message.success("Create theme successfully");
      router.push("/admin/dashboard", { scroll: false });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onError = (error: any) => {
    console.log(Object.values(error));
    for (const item of Object.values(error) as any) {
      message.error(item["message"]);
    }
  };

  const thumbnailTypes = ["JPG", "PNG", "GIF"];
  const handleChangeThumbnail = async (file: any) => {
    try {
      const result = await uploadTheme({
        thumbnail: file,
      });
      setThumbnail(result.data.thumbnail);
      message.success("Update thumbnail successfully");
    } catch (err) {
      message.error("Update thumbnail failed");
    }
  };

  const previewsTypes = ["JPG", "PNG", "GIF"];
  const handleChangePreviews = async (file: any) => {
    try {
      const result = await uploadTheme({
        previews: file,
      });
      setPreviews(result.data.previews);
      message.success("Update previews successfully");
    } catch (err) {
      message.error("Update previews failed");
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
      ?.map((item, index) => item.split("/")[1])
      ?.join("/")
      ?.toUpperCase();

    if (!isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`);
      return;
    }
    try {
      const result = await uploadTheme({
        zip_file: e.target.files[0],
      });
      setThemeFile(e.target.files[0]);
      setTheme(result.data.zip_file);
      message.success("Update theme zip successfully");
    } catch (err) {
      message.error("Update theme zip failed");
    }
  };

  const navLinks = [
    {
      title: "Overview",
    },
    {
      title: "Features",
    },
    {
      title: "Images",
    },
    {
      title: "File",
    },
  ];

  const NavLinkComponent = () => {
    return (
      <ul className="flex items-center justify-between font-medium mt-[32px] gap-10">
        {navLinks.map((item, index) => (
          <li
            key={index}
            onClick={() => setTab(index)}
            className={`flex flex-1 p-[16px] items-center gap-4 cursor-pointer ${
              index === tab ? "bg-[#F8FAFC]" : "bg-[#fff]"
            }`}
          >
            <span
              className={`w-[40px] flex items-center justify-center h-[40px] border border-1 rounded-[50%] ${
                index === tab
                  ? "border-[#4F46E5] text-[#4F46E5] "
                  : "border-[#6B7280] text-[#6B7280]"
              }`}
            >
              {index + 1}
            </span>
            <p
              className={`${
                index === tab ? "text-[#4F46E5]" : "text-[#6B7280]"
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
            className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[14px] ml-4"
          >
            Submit for review
          </button>
        </div>
      </div>
      <NavLinkComponent />
      {tab === 0 && (
        <div className="flex gap-8">
          <div className="basis-3/5">
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                Product type
              </h1>
              <ul className="flex gap-4">
                <li className="flex w-full cursor-pointer justify-start p-[20px] bg-[#EEF2FF] border border-[#4F46E5] border-2 rounded-[8px]">
                  <label
                    className="flex gap-2 cursor-pointer"
                    htmlFor="single-theme"
                  >
                    <div className="pt-1">
                      <img src={"/assets/image/admin/upload-single.svg"} />
                    </div>
                    <div>
                      <h3 className="font-medium">Single product</h3>
                      <p className="mt-1">
                        {theme && themeFile
                          ? `${themeFile.name} (${themeFile.size}MB)`
                          : `
                          Any set of files to download that contain a single type of category
                          
                          `}
                      </p>
                    </div>
                  </label>
                  <Input
                    id="single-theme"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChangeThemeZip(e, ["application/zip"])
                    }
                  />
                  {/* <Input id="single-theme" type="file" className="hidden"/> */}
                </li>
                {/* <li className="flex w-[50%] cursor-pointer gap-2 justify-start p-[20px] border border-[#D1D5DB] border-2 rounded-[8px]">
                  <label
                    className="flex gap-2 cursor-pointer"
                    htmlFor="multiple-theme"
                  >
                    <div className="pt-1">
                      <img src={"/assets/image/admin/upload-bundle.svg"} />
                    </div>
                    <div>
                      <h3 className="font-medium">Bundle</h3>
                      <p className="mt-1">
                        Sell two or more existing products as a new pack and new
                        price
                      </p>
                    </div>
                  </label>
                  <Input
                    id="multiple-theme"
                    type="file"
                    className="hidden"
                    multiple
                  />
                </li> */}
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
                        status={errors.name?.message ? "error" : ""}
                        placeholder={errors.name?.message || ""}
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
                        className="w-[100%] h-[100px] px-[13px] py-[9px] border text-[#64748B] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                        {...field}
                        status={errors.overview?.message ? "error" : ""}
                        placeholder={
                          errors.overview?.message ||
                          "Something about your product..."
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
                  <div className="flex h-[44px] border border-[#D1D5DB] border-2 rounded-[8px]">
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
                          status={errors.selling_price?.message ? "error" : ""}
                          placeholder={errors.selling_price?.message || "1.00"}
                        />
                      )}
                    />
                  </div>
                  <span className="text-[#64748B]">
                    How much do you want to sell this?
                  </span>
                </li>
                <li className="w-full">
                  <h2>Ownership price</h2>
                  <div className="flex h-[44px]  border-[#D1D5DB] border-2 rounded-[8px]">
                    <div className="w-[62px] h-full flex justify-center items-center bg-[#EEF2FF] rounded-l-[8px]">
                      SOL
                    </div>
                    <Controller
                      name="owner_price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                          type="text"
                          {...field}
                          status={errors.owner_price?.message ? "error" : ""}
                          placeholder={errors.owner_price?.message || "1.00"}
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
                    <img src={"/assets/image/admin/note.svg"} />
                    <p className="pl-1">What is ownership?</p>
                  </div>
                  <div className="flex mt-1">
                    <img src={"/assets/image/admin/note.svg"} />
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
                  types={thumbnailTypes}
                  children={<Uploader />}
                />
                {thumbnail && (
                  <img className="w-[80%] h-full" src={thumbnail} />
                )}
                {/* <li></li> */}
              </ul>
            </div>
            <div className="">
              <h1 className="my-6 text-[#111827] text-xl font-medium">
                File type included
              </h1>
              <ul className="flex gap-4 flex-wrap">
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/figma.svg"}
                  />
                  <h2>Figma</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/framer.svg"}
                  />
                  <h2>Framer</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/blender.svg"}
                  />
                  <h2>Blender</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/html.svg"}
                  />
                  <h2>HTML</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/powerpoint.svg"}
                  />
                  <h2>Powerpoint</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/photoshop.svg"}
                  />
                  <h2>Photoshop</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                  <img
                    className="w-[16px]"
                    src={"/assets/image/admin/illustrator.svg"}
                  />
                  <h2>Illustrator</h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="flex">
          <div className="basis-1/2">
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Highlight feature
            </h1>
            <ul className="flex gap-4 flex-col w-[70%]">
              {/* <li className="flex justify-between gap-4 border border-1 border-[#9CA3AF] p-4 rounded-[8px] w-[70%]">
                <div className="flex items-center gap-4">
                  <img src={"/assets/image/admin/check.svg"} />
                  <h3>Auto Dark Theme available220+ </h3>
                </div>
                <img src={"/assets/image/admin/list.svg"} />
              </li> */}
              <SelectFeature data={features} />
              <SelectFeature data={features} />
              <SelectFeature data={features} />
              <SelectFeature data={features} />
              <SelectFeature data={features} />
            </ul>
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Link preview
            </h1>

            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-600"
              >
                Link preview
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`
                  block w-[70%] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                 px-[13px] py-[12px] rounded-r-[8px] outline-[#D1D5DB]
                  `}
                placeholder="http://www.nimbus.com"
              />
            </div>
          </div>
          <div className="basis-1/2">
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Select Category
            </h1>
            <Input
              className="px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB] w-[80%]"
              type="text"
              // status={errors.name?.message ? "error" : ""}
              placeholder={"Type a category and press enter..."}
            />
            <ul className="flex flex-wrap gap-4 mt-4">
              <li className="p-4 rounded-[8px] bg-[#E9D5FF] text-[#A855F7] w-max">
                Template & Themes
              </li>
              <li className="p-4 rounded-[8px] bg-[#E9D5FF] text-[#A855F7] w-max">
                Template & Themes
              </li>
              <li className="p-4 rounded-[8px] bg-[#E9D5FF] text-[#A855F7] w-max">
                Template & Themes
              </li>
            </ul>

            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Select Tags
            </h1>
            <Input
              className="px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB] w-[80%]"
              type="text"
              // status={errors.name?.message ? "error" : ""}
              placeholder={"Type a tag and press enter..."}
            />
            <ul className="flex flex-wrap gap-4 mt-4">
              <li className="p-4 rounded-[8px] bg-[#E0E7FF] text-[#3730A3] w-max">
                UX/UI Design
              </li>
              <li className="p-4 rounded-[8px] bg-[#E0E7FF] text-[#3730A3] w-max">
                UX/UI Design
              </li>
              <li className="p-4 rounded-[8px] bg-[#E0E7FF] text-[#3730A3] w-max">
                UX/UI Design
              </li>
            </ul>
          </div>
        </div>
        // <ul className="flex flex-col gap-4 mt-4">
        //   <li className="w-full">
        //     <h2>Template features</h2>
        //     <Controller
        //       name="template_features"
        //       control={control}
        //       render={({ field }) => (
        //         <Input
        //           className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
        //           type="text"
        //           {...field}
        //           status={errors.template_features?.message ? "error" : ""}
        //           placeholder={errors.template_features?.message || ""}
        //         />
        //       )}
        //     />
        //   </li>
        //   <li className="w-full mt-2">
        //     <h2>Figma features</h2>
        //     <Controller
        //       name="figma_features"
        //       control={control}
        //       render={({ field }) => (
        //         <Input
        //           className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
        //           type="text"
        //           {...field}
        //           status={errors.figma_features?.message ? "error" : ""}
        //           placeholder={errors.figma_features?.message || ""}
        //         />
        //       )}
        //     />
        //   </li>
        // </ul>
      )}
      {tab === 2 && (
        // <div className="flex justify-center">
        //   <div className="mt-8 border border-1 border-[#9CA3AF] border-solid rounded-xl w-[50%] p-8">
        //     <h2 className="text-[20px] font-semibold mb-6">Creator earnings</h2>
        //     <div className="p-4 bg-[#F9FAFB] rounded-xl">
        //       <div className="flex gap-4 mb-4">
        //         <img
        //           className="w-[16px]"
        //           src={"/assets/image/admin/house.svg"}
        //         />
        //         <h2 className="font-medium">
        //           Your contract enforces fees on OpenSea
        //         </h2>
        //       </div>
        //       <p className="text-[#6B7280]">
        //         Earn apercentage of the sale price when one of your items is
        //         re-sold using OpenSea. Adding multiple addresses may increase
        //         gas fees for buyers. If you set a lower fee on other
        //         marketplaces, your fee on OpenSea will be updated to match that
        //         amount.
        //       </p>
        //     </div>
        //     <ul>
        //       {creators.map((item: any, index: number) => (
        //         <li key={index} className="flex gap-4 mt-4">
        //           <Input
        //             className="w-[70%] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
        //             type="text"
        //             value={item.email}
        //             // {...field}
        //             status={errors.owner_price?.message ? "error" : ""}
        //             placeholder={
        //               errors.owner_price?.message || "you@example.com"
        //             }
        //           />
        //           <div className="flex w-[30%] px-[13px] py-[9px] rounded-[8px] outline-[#D1D5DB] border-2 border-solid border-[#D1D5DB]">
        //             <Input
        //               className="w-[80%] rounded-r-[8px] outline-none border-none"
        //               type="text"
        //               value={item.percent}
        //               // {...field}
        //               // status={errors.owner_price?.message ? "error" : ""}
        //               placeholder={errors.owner_price?.message || "100"}
        //             />
        //             <span className="flex items-center w-[20%]">%</span>
        //           </div>
        //           <img
        //             onClick={() => {
        //               const newCreators = creators.filter((creator: any, creatorIndex: number) => creatorIndex !== index);
        //               setCreators(newCreators);
        //             }}
        //             className="cursor-pointer"
        //             src={"/assets/image/admin/trash.svg"}
        //           />
        //         </li>
        //       ))}
        //     </ul>
        //     <div className="flex mt-4 gap-6">
        //       <div
        //         onClick={() => {
        //           const newCreators = [
        //             ...creators,
        //             {
        //               email: "hung@gmail.com",
        //               percent: 10,
        //             },
        //           ];
        //           setCreators(newCreators);
        //         }}
        //         className="flex cursor-pointer"
        //       >
        //         <img
        //           className="cursor-pointer"
        //           src={"/assets/image/admin/plus.svg"}
        //         />
        //         <h2 className="text-[#3B82F6]">
        //           Add earnings payout address and percentage
        //         </h2>
        //       </div>
        //       <h2>Total</h2>
        //       <h2>{creators.reduce((acc: number, item: any) => {
        //         acc += item.percent;
        //         return acc;
        //       }, 0)}%</h2>
        //     </div>
        //   </div>
        // </div>
        <div className="">
          <h1 className="my-6 text-[#111827] text-xl font-medium">Cover</h1>
          <ul className="flex gap-4 flex-col">
            <FileUploader
              handleChange={handleChangePreviews}
              name="file"
              types={previewsTypes}
              classes={"!h-max w-[100%] !max-w-full text-center"}
              children={<Uploader />}
            />
          </ul>
          <h1 className="my-6 text-[#111827] text-xl font-medium">
            Detail images (4-8 required approval)
          </h1>
          <ul className="flex gap-4 flex-col">
            <FileUploader
              handleChange={handleChangePreviews}
              name="file"
              types={previewsTypes}
              classes={"!h-max w-[100%] !max-w-full text-center"}
              children={<Uploader />}
            />
          </ul>
          <h1 className="my-6 text-[#111827] text-xl font-medium">
            Full preiviews
          </h1>
          <ul className="flex gap-4 flex-col">
            <FileUploader
              handleChange={handleChangePreviews}
              name="file"
              types={previewsTypes}
              classes={"!h-max w-[100%] !max-w-full text-center"}
              children={<Uploader />}
            />
          </ul>
        </div>
      )}
      {tab === 3 && (
        // <div>
        //   <label
        //     className="flex flex-col justify-center items-center cursor-pointer border border-1 border-solid border-[##D1D5DB] p-[48px] text-[#4B5563] w-max rounded-xl"
        //     htmlFor="your-product"
        //   >
        //     <div className="text-2xl w-[48px] h-[48px] rounded-[50%] flex justify-center items-center border border-1 border-solid border-[#4B5563]">
        //       +
        //     </div>
        //     <h1 className="text-xl mt-2">Choose your product.</h1>
        //   </label>
        //   <Input
        //     id="your-product"
        //     type="file"
        //     className="hidden"
        //     onChange={(e) => handleChangeThemeZip(e, ["application/zip"])}
        //   />
        // </div>
        <div>
          <h1 className="my-6 text-[#111827] text-xl font-medium">File</h1>
          <ul className="flex gap-4 flex-col">
            <FileUploader
              handleChange={handleChangePreviews}
              name="file"
              multiple
              types={previewsTypes}
              classes={"!h-max w-[100%] !max-w-full text-center"}
              children={<Uploader />}
            />
          </ul>
        </div>
      )}
    </form>
  );
}

export default AddProductPage;
