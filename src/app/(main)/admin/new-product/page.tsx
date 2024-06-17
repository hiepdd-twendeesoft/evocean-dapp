"use client";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";


function ProductPage() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[#111827] text-3xl not-italic font-bold leading-9">
          Add new product
        </h1>
        <div className="text-base not-italic font-semibold leading-6">
          <button className="px-[17px] py-[9px] rounded-[14px] border border-[#D1D5DB] border-1 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            Save as draft
          </button>
          <button className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[14px] ml-4">
            Submit for review
          </button>
        </div>
      </div>
      <ul className="flex items-center font-medium mt-[32px] gap-10">
        <li className="flex items-center gap-4">
          <span className="w-[40px] flex items-center justify-center h-[40px] border border-[#4F46E5] text-[#4F46E5] border-1 rounded-[50%]">
            1
          </span>
          <p className="text-[#4F46E5]">Overview</p>
        </li>
        <li className="flex items-center gap-4">
          <span className="w-[40px] flex items-center justify-center h-[40px] border border-[#6B7280] text-[#6B7280] border-1 rounded-[50%]">
            2
          </span>
          <p className="text-[#6B7280]">Features</p>
        </li>
        <li className="flex items-center gap-4">
          <span className="w-[40px] flex items-center justify-center h-[40px] border border-[#6B7280] text-[#6B7280] border-1 rounded-[50%]">
            3
          </span>
          <p className="text-[#6B7280]">Images</p>
        </li>
        <li className="flex items-center gap-4">
          <span className="w-[40px] flex items-center justify-center h-[40px] border border-[#6B7280] text-[#6B7280] border-1 rounded-[50%]">
            4
          </span>
          <p className="text-[#6B7280]">File</p>
        </li>
      </ul>
      <div className="flex gap-8">
        <form className="basis-3/5">
          <div className="">
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Product type
            </h1>
            <ul className="flex gap-4">
              <li className="flex cursor-pointer gap-2 justify-start p-[20px] bg-[#EEF2FF] border border-[#4F46E5] border-2 rounded-[8px]">
                <div className="pt-1">
                  <img src={"/assets/image/admin/upload-single.svg"} />
                </div>
                <div>
                  <h3 className="font-medium">Single product</h3>
                  <p className="mt-1">
                    Any set of files to download that contain a single type of
                    category
                  </p>
                </div>
              </li>
              <li className="flex cursor-pointer gap-2 justify-start p-[20px] border border-[#D1D5DB] border-2 rounded-[8px]">
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
                <input
                  className="w-[100%] px-[13px] py-[9px] border border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                  type="text"
                />
                <span className="text-[#64748B]">Give it a catchy name</span>
              </li>
              <li className="w-full mt-2">
                <h2>Description</h2>
                <textarea
                  className="w-[100%] h-[100px] px-[13px] py-[9px] border text-[#64748B] border-[#D1D5DB] border-2 rounded-[8px] outline-[#D1D5DB]"
                  placeholder="Something about your product..."
                />
              </li>
            </ul>
          </div>
          <div className="">
            <h1 className="my-6 text-[#111827] text-xl font-medium">Pricing</h1>
            <ul className="flex flex-col gap-4">
              <li className="w-full">
                <h2>Selling pricing</h2>
                <div className="flex h-[44px] border border-[#D1D5DB] border-2 rounded-[8px]">
                  <div className="w-[62px] h-full flex justify-center items-center bg-[#EEF2FF] rounded-l-[8px]">
                    SOL
                  </div>
                  <input
                    className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                    type="text"
                    placeholder="1.00"
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
                  <input
                    className="w-[100%] px-[13px] py-[9px] rounded-r-[8px] outline-[#D1D5DB]"
                    type="text"
                    placeholder="1.00"
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
        </form>
        <div className="basis-2/5">
          <div className="">
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              Thumbnail
            </h1>
            <ul className="flex gap-4">
                <FileUploader  handleChange={handleChange} name="file" types={fileTypes} />
              {/* <li></li> */}
            </ul>
          </div>
          <div className="">
            <h1 className="my-6 text-[#111827] text-xl font-medium">
              File type included
            </h1>
            <ul className="flex gap-4 flex-wrap">
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/figma.svg"} />
                    <h2>Figma</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/framer.svg"} />
                    <h2>Framer</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/blender.svg"} />
                    <h2>Blender</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/html.svg"} />
                    <h2>HTML</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/powerpoint.svg"} />
                    <h2>Powerpoint</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/photoshop.svg"} />
                    <h2>Photoshop</h2>
                </li>
                <li className="flex gap-4 items-center p-[12px] rounded-[8px] border-[#D1D5DB] border-2 w-[48%]">
                    <img className="w-[16px]" src={"/assets/image/admin/illustrator.svg"} />
                    <h2>Illustrator</h2>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
