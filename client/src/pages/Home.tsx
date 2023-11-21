import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Slide from "../components/home/Slide";
import { RootState } from "../Store";

function Home() {
  const HomeBanner = useSelector((state: RootState) => state.HomeBanner);
  return (
    <div className="home">
      <div className="home-nav"></div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {HomeBanner.map((it, i) => {
          return (
            <SwiperSlide key={i}>
              <Slide banner={it} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Home;
