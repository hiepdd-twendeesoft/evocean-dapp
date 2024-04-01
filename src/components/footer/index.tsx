const Footer = () => {
  return (
    <div className="py-12 flex-col items-center justify-center flex">
      <img
        src={"/assets/image/Logo.svg"}
        className="h-[24px] w-[146px]"
        alt="Logo"
      />
      <div className="mt-8">
        <a href="#" className="text-gray-500 rounded-md px-3 py-2 text-[16px]">
          About
        </a>
        <a href="#" className="text-gray-500 rounded-md px-3 py-2 text-[16px]">
          Contact
        </a>
        <a href="#" className="text-gray-500 rounded-md px-3 py-2 text-[16px]">
          Partners
        </a>
        <a
          href="#"
          className="text-gray-500 rounded-md px-3 py-2 text-sm text-[16px]"
        >
          Blockchain technology
        </a>
      </div>
      <p className="text-[#9CA3AF] text-[16px] my-8">
        © 2024 Evocean, Inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
