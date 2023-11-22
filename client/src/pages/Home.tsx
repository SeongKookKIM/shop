import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Slide from "../components/home/Slide";
import { RootState } from "../Store";

function Home() {
  const [slideNum, setSlideNum] = useState<number>(0);

  const HomeBanner = useSelector((state: RootState) => state.HomeBanner);

  const handleSlideChange = (swiper: any) => {
    setSlideNum(swiper.realIndex);
  };
  return (
    <div className="home">
      <Swiper
        speed={2000}
        navigation={true}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        className="mySwiper"
      >
        {HomeBanner.map((it, i) => {
          return (
            <SwiperSlide key={i}>
              <Slide banner={it} num={slideNum} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Home;
