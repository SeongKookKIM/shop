import { configureStore, createSlice } from "@reduxjs/toolkit";

// 배너 slide
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
        link: "/product/all/life",
      },
    ],
    [
      {
        src: "/assets/banner/2-best.jpg",
        title: "BEST | 베스트",
        link: "/product/men/best",
      },
      {
        src: "/assets/banner/2-new.jpg",
        title: "NEW | 신상품",
        link: "/product/men/new",
      },
      {
        src: "/assets/banner/2-collection.jpg",
        title: "COLLECTION | 콜렉션",
        link: "/product/men/collection",
      },
    ],
    [
      {
        src: "/assets/banner/3-best.jpg",
        title: "BEST | 베스트",
        link: "/product/women/best",
      },
      {
        src: "/assets/banner/3-new.jpg",
        title: "NEW | 신상품",
        link: "/product/women/new",
      },
      {
        src: "/assets/banner/3-collection.jpg",
        title: "COLLECTION | 콜렉션",
        link: "/product/women/collection",
      },
    ],
    [
      {
        src: "/assets/banner/4-home01.jpg",
        title: "HOME | 크리스마스",
        link: "/product/home/deco",
      },
      {
        src: "/assets/banner/4-home02.jpg",
        title: "HOME | 크리스마스",
        link: "/product/home/deco",
      },
      {
        src: "/assets/banner/4-home03.jpg",
        title: "HOME | 크리스마스",
        link: "/product/home/deco",
      },
      {
        src: "/assets/banner/4-home04.jpg",
        title: "HOME | 크리스마스",
        link: "/product/home/deco",
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

// 메뉴
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

const menuActive = createSlice({
  name: "menuActive",
  initialState: {
    active: false,
  },
  reducers: {
    handlerMenuActive(state, action) {
      state.active = action.payload;
    },
  },
});
export let { handlerMenuActive } = menuActive.actions;

// 바스킷벡
const showCartPage = createSlice({
  name: "showCartPage",
  initialState: {
    show: false,
  },
  reducers: {
    handlerCartShow(state, action) {
      state.show = action.payload;
    },
  },
});
export let { handlerCartShow } = showCartPage.actions;

// 결제
const payAddress = createSlice({
  name: "payAddress",
  initialState: {
    address: "",
    addressDetail: "",
  },
  reducers: {
    handlerChangeAddress(state, action) {
      state.address = action.payload.address;
      state.addressDetail = action.payload.addressDetail;
    },
  },
});
export let { handlerChangeAddress } = payAddress.actions;

// 관리자 페이지 메뉴
const adminNav = createSlice({
  name: "adminNav",
  initialState: {
    show: true,
  },
  reducers: {
    handlerAdminMenu(state, action) {
      state.show = action.payload;
    },
  },
});
export let { handlerAdminMenu } = adminNav.actions;

const adminPageChange = createSlice({
  name: "adminPageChange",
  initialState: {
    pages: "",
  },
  reducers: {
    handlerAdminPagesChange(state, action) {
      state.pages = action.payload.pages;
    },
  },
});

export let { handlerAdminPagesChange } = adminPageChange.actions;

const adminUserDetailId = createSlice({
  name: "adminUserDetailId",
  initialState: {
    _id: "",
  },
  reducers: {
    handlerUserClickId(state, action) {
      state._id = action.payload._id;
    },
  },
});
export let { handlerUserClickId } = adminUserDetailId.actions;

const adminInquryDetail = createSlice({
  name: "adminInquryDetail",
  initialState: {
    _id: "",
    user: "",
    title: "",
    date: "",
    detail: "",
    imageSrc: [],
    answer: "",
  },
  reducers: {
    handlerAdmininqurtDetail(state, action) {
      state._id = action.payload._id;
      state.user = action.payload.user;
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.detail = action.payload.detail;
      state.imageSrc = action.payload.imageSrc;
      state.answer = action.payload.answer;
    },
  },
});

export let { handlerAdmininqurtDetail } = adminInquryDetail.actions;

const store = configureStore({
  reducer: {
    HomeBanner: HomeBanner.reducer,
    menuClass: menuClass.reducer,
    menuActive: menuActive.reducer,
    slideNum: slideNum.reducer,
    swiperText: swiperText.reducer,
    showCartPage: showCartPage.reducer,
    payAddress: payAddress.reducer,
    adminNav: adminNav.reducer,
    adminPageChange: adminPageChange.reducer,
    adminUserDetailId: adminUserDetailId.reducer,
    adminInquryDetail: adminInquryDetail.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
