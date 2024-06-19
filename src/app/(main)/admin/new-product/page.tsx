"use client";

import {
  EThemeStatus,
  TCreateTheme,
  TCreateThemeSchema,
} from "@/models/theme.type";
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
  const [theme, setTheme] = useState<File>();
  const [previews, setPreviews] = useState<File[]>();
  const [thumbnail, setThumbnail] = useState<File>();
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
      theme,
      previews,
      thumbnail,
      template_features,
      figma_features,
      status,
    };

    try {
      console.log("createThemeDto", createThemeDto);
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
  const handleChangeThumbnail = (file: any) => {
    setThumbnail(file);
  };

  const previewsTypes = ["JPG", "PNG", "GIF"];
  const handleChangePreviews = (file: any) => {
    setPreviews(file);
  };

  const handleChangeThemeZip = (
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
    setTheme(e.target.files[0]);
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
      <ul className="flex items-center font-medium mt-[32px] gap-10">
        {navLinks.map((item, index) => (
          <li
            key={index}
            onClick={() => setTab(index)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <span
              className={`w-[40px] flex items-center justify-center h-[40px] border border-1 rounded-[50%] ${
                index === tab
                  ? "border-[#4F46E5] text-[#4F46E5]"
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
                <li className="flex w-[50%] cursor-pointer justify-start p-[20px] bg-[#EEF2FF] border border-[#4F46E5] border-2 rounded-[8px]">
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
                        {theme
                          ? `${theme.name} (${theme.size}MB)`
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
                <li className="flex w-[50%] cursor-pointer gap-2 justify-start p-[20px] border border-[#D1D5DB] border-2 rounded-[8px]">
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
                  {/* <Input id="multiple-theme" type="file" className="hidden" multiple/> */}
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
              <ul className="flex gap-4">
                <FileUploader
                  handleChange={handleChangeThumbnail}
                  name="file"
                  types={thumbnailTypes}
                />
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
        <ul className="flex flex-col gap-4 mt-4">
          <li className="w-full">
            <h2>Template features</h2>
            <Controller
              name="template_features"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                  type="text"
                  {...field}
                  status={errors.template_features?.message ? "error" : ""}
                  placeholder={errors.template_features?.message || ""}
                />
              )}
            />
          </li>
          <li className="w-full mt-2">
            <h2>Figma features</h2>
            <Controller
              name="figma_features"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-[100%] px-[13px] py-[9px] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                  type="text"
                  {...field}
                  status={errors.figma_features?.message ? "error" : ""}
                  placeholder={errors.figma_features?.message || ""}
                />
              )}
            />
          </li>
        </ul>
      )}
      {tab === 2 && (
        <div className="">
          <h1 className="my-6 text-[#111827] text-xl font-medium">Previews</h1>
          <ul className="flex gap-4">
            <FileUploader
              handleChange={handleChangePreviews}
              name="file"
              dsds
              types={previewsTypes}
              multiple
              classes={"h-[700px] w-[50%]"}
            />
            {/* <li></li> */}
          </ul>
        </div>
      )}
    </form>
  );
}

export default AddProductPage;
