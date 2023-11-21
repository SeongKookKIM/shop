import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Mousewheel } from "swiper/modules";

interface bannerProps {
  banner: string[];
}

function Slide({ banner }: bannerProps) {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        speed={500}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel]}
        className="vertical-swiper"
      >
        {banner.map((it, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={it}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Slide;
