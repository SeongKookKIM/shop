import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import "swiper/css";

import { Mousewheel } from "swiper/modules";
import { RootState } from "../../Store";

function Slide() {
  const homeAll = useSelector((state: RootState) => state);
  console.log(homeAll);

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel]}
        className="vertical-swiper"
      >
        {homeAll.HomeAll.map((it, idx) => {
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
