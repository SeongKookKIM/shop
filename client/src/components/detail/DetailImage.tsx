import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";

import { FreeMode, Thumbs, Mousewheel, Scrollbar } from "swiper/modules";

type ProductType = {
  color: string[];
  description: string;
  mainCategory: string;
  name: string;
  price: string;
  size: string[];
  src: string[];
  subCategory: string;
  thumbnail: string;
  _id: string;
};

interface itemType {
  detailItem: ProductType | undefined;
}

function DetailImage({ detailItem }: itemType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <div className="item-detail-image ">
      <Swiper
        spaceBetween={0}
        speed={1000}
        direction={"vertical"}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Mousewheel, Scrollbar]}
        mousewheel={true}
        scrollbar={true}
        className="mySwiper2"
      >
        {detailItem && (
          <>
            {detailItem.src.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={item} alt="itemImg" />
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
      <Swiper
        spaceBetween={0}
        freeMode={true}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {detailItem && (
          <>
            {detailItem.src.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={item} alt="itemImg" />
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </div>
  );
}

export default DetailImage;
