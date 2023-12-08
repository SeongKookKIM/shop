import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Slide from "../components/home/Slide";
import { RootState } from "../Store";
import Menu from "../components/menu/Menu";

function Home() {
  const [slideNum, setSlideNum] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperCore>();

  const HomeBanner = useSelector((state: RootState) => state.HomeBanner);
  const swiperNum = useSelector((state: RootState) => state.slideNum);

  const handleSlideChange = (swiper: any) => {
    setSlideNum(swiper.realIndex);
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(swiperNum);
    }
  }, [swiperNum]);

  return (
    <div className="home">
      <Menu />
      <Swiper
        navigation={true}
        speed={2000}
        onSlideChange={handleSlideChange}
        onSwiper={setSwiper}
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
