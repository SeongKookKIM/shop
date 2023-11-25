import { configureStore, createSlice } from "@reduxjs/toolkit";

const HomeBanner = createSlice({
  name: "HomeBanner",
  initialState: [
    [
      {
        src: "/assets/banner/1-coat.jpg",
        title: "COAT | 코트",
        link: "/product/all/coat",
      },
      {
        src: "/assets/banner/1-best.jpg",
        title: "BEST | 베스트",
        link: "/product/all/best",
      },
      {
        src: "/assets/banner/1-new.jpg",
        title: "NEW | 신상품",
        link: "/product/all/new",
      },
      {
        src: "/assets/banner/1-life.jpg",
        title: "LIFE | 데코",
        link: "/product/all/deco",
      },
    ],
    [
      { src: "/assets/banner/2-best.jpg", title: "BEST | 베스트", link: "/" },
      { src: "/assets/banner/2-new.jpg", title: "NEW | 신상품", link: "/" },
      {
        src: "/assets/banner/2-collection.jpg",
        title: "COLLECTION | 콜렉션",
        link: "/",
      },
    ],
    [
      { src: "/assets/banner/3-best.jpg", title: "BEST | 베스트", link: "/" },
      { src: "/assets/banner/3-new.jpg", title: "NEW | 신상품", link: "/" },
      {
        src: "/assets/banner/3-collection.jpg",
        title: "COLLECTION | 콜렉션",
        link: "/",
      },
      {
        src: "/assets/banner/3-cardigan.jpg",
        title: "CARDIGAN | 가디건",
        link: "/",
      },
    ],
    [
      {
        src: "/assets/banner/4-home01.jpg",
        title: "HOME | 크리스마스",
        link: "/",
      },
      {
        src: "/assets/banner/4-home02.jpg",
        title: "HOME | 크리스마스",
        link: "/",
      },
      {
        src: "/assets/banner/4-home03.jpg",
        title: "HOME | 크리스마스",
        link: "/",
      },
      {
        src: "/assets/banner/4-home04.jpg",
        title: "HOME | 크리스마스",
        link: "/",
      },
      {
        src: "/assets/banner/4-home05.jpg",
        title: "HOME | 크리스마스",
        link: "/",
      },
    ],
  ],
  reducers: {},
});

const menuClass = createSlice({
  name: "menuClass",
  initialState: {
    menuClass: "menu",
  },
  reducers: {
    handlerMenu(state, action) {
      state.menuClass = action.payload;
    },
  },
});
export let { handlerMenu } = menuClass.actions;

const swiperText = createSlice({
  name: "swiperText",
  initialState: {
    textClass: "",
  },
  reducers: {
    handlerSwiperText(state, action) {
      state.textClass = action.payload;
    },
  },
});
export let { handlerSwiperText } = swiperText.actions;

const slideNum = createSlice({
  name: "slideNum",
  initialState: 0,
  reducers: {
    handlerSlideNum(state, action) {
      state = action.payload;

      return state;
    },
  },
});
export let { handlerSlideNum } = slideNum.actions;

const store = configureStore({
  reducer: {
    HomeBanner: HomeBanner.reducer,
    menuClass: menuClass.reducer,
    slideNum: slideNum.reducer,
    swiperText: swiperText.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
