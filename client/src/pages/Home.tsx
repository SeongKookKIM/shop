import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Slide from "../components/home/Slide";
import { RootState } from "../Store";

function Home() {
  const homeAll = useSelector((state: RootState) => state.HomeAll);
  return (
    <div className="home">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {homeAll.map((it, i) => {
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
