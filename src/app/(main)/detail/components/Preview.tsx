"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FC, memo, useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import ImageViewer from "react-simple-image-viewer";

interface IProps {
  data?: string[];
}

const Preview: FC<IProps> = ({ data }) => {
  const [isViewerOpen, setViewerOpen] = useState<boolean>(false);
  const [indexImage, setIndexImage] = useState<number>(0);

  const handleCloseViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const handleViewerImage = useCallback(() => {
    setViewerOpen(true);
  }, []);

  return (
    <div className="z-10">
      <img
        onClick={handleViewerImage}
        src={data?.[indexImage] || "/assets/image/theme.png"}
        alt="theme"
        className="w-[100%] max-h-[475px] max-sm:max-h-[225px] rounded-[20px] border-[1px] border-gray-200 cursor-pointer mb-5 drop-shadow-md"
      />
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="-z-10"
      >
        {data?.map((item, index) => (
          <SwiperSlide
            onClick={() => setIndexImage(index)}
            key={index}
            className="cursor-pointer group -z-10"
          >
            <img
              src={item}
              alt="theme"
              className="w-[100%] rounded-[8px] drop-shadow-md max-h-[80px]"
            />
            <div className="absolute top-0 left-0 rounded-[8px] group-hover:block hidden right-0 bottom-0 bg-[#00000050]" />
          </SwiperSlide>
        ))}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={data || []}
          currentIndex={indexImage}
          closeOnClickOutside={true}
          onClose={handleCloseViewer}
          disableScroll={false}
        />
      )}
    </div>
  );
};

export default memo(Preview);
