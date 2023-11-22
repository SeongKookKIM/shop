import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Mousewheel } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerMenu, handlerSwiperText } from "../../Store";

type BannerItem = {
  src: string;
  title: string;
  link: string;
};
interface bannerProps {
  banner: BannerItem[];
  num: number;
}

function Slide({ banner, num }: bannerProps) {
  const [slideNum, setSlideNum] = useState<number>(0);

  const swiperText = useSelector((state: RootState) => state.swiperText);

  const handleSlideChange = (swiper: any) => {
    setSlideNum(swiper.realIndex);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    if (num === 0 && slideNum === 2) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 0 && slideNum === 3) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 1 && slideNum === 0) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 1 && slideNum === 1) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 2 && slideNum === 3) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 3 && slideNum === 0) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 3 && slideNum === 2) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 3 && slideNum === 3) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else if (num === 3 && slideNum === 4) {
      dispatch(handlerMenu("menu-active"));
      dispatch(handlerSwiperText("active"));
    } else {
      dispatch(handlerMenu("menu"));
      dispatch(handlerSwiperText(""));
    }
  }, [num, slideNum]);

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
        onSlideChange={handleSlideChange}
        modules={[Mousewheel]}
        className="vertical-swiper"
      >
        {banner.map((it, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={it.src} alt={`Slide ${idx + 1}`}></img>
              <span className={`${swiperText.textClass}`}>{it.title}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Slide;
