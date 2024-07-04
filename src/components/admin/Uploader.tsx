export const Uploader = () => {
  return (
    <div className="flex justify-center items-center cursor-pointer h-max w-[100%] p-[80px] bg-[#F9FAFB] border border-1 border-dashed border-[#D1D5DB] rounded-[16px]">
      <div className="flex flex-col justify-center items-center">
        <img src={"/assets/image/admin/uploader.svg"} />
        <h2 className="text-[20px]">Drag & drop image or click on to upload. </h2>
        <p className="mt-2 text-center">Image 1208x840px size required in PNG or JPG format only.</p>
      </div>
    </div>
  );
};
