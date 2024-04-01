"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { memo, useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import ImageViewer from "react-simple-image-viewer";

const images = [
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
  "/assets/image/theme.png",
];

const Preview = () => {
  const [isViewerOpen, setViewerOpen] = useState<boolean>(false);

  const handleCloseViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const handleViewerImage = useCallback(() => {
    setViewerOpen(true);
  }, []);

  return (
    <div>
      <img
        onClick={handleViewerImage}
        src="/assets/image/theme.png"
        alt="theme"
        className="w-[100%] rounded-[20px] border-[1px] border-gray-200 cursor-pointer mb-5 drop-shadow-md"
      />
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="cursor-pointer group">
            <img
              src={item}
              alt="theme"
              className="w-[100%] rounded-[8px] drop-shadow-md"
            />
            <div className="absolute top-0 left-0 rounded-[8px] group-hover:block hidden right-0 bottom-0 bg-[#00000050]" />
          </SwiperSlide>
        ))}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={0}
          closeOnClickOutside={true}
          onClose={handleCloseViewer}
          disableScroll={false}
        />
      )}
    </div>
  );
};

export default memo(Preview);
