import { configureStore, createSlice } from "@reduxjs/toolkit";

const HomeAll = createSlice({
  name: "HomeAll",
  initialState: [
    [
      "/assets/banner/1-best.jpg",
      "/assets/banner/1-coat.jpg",
      "/assets/banner/1-new.jpg",
      "/assets/banner/1-life.jpg",
    ],
    [
      "/assets/banner/2-best.jpg",
      "/assets/banner/2-new.jpg",
      "/assets/banner/2-collection.jpg",
    ],
    [
      "/assets/banner/3-best.jpg",
      "/assets/banner/3-new.jpg",
      "/assets/banner/3-collection.jpg",
      "/assets/banner/2-cardigan.jpg",
    ],
    [
      "/assets/banner/4-home01.jpg",
      "/assets/banner/4-home02.jpg",
      "/assets/banner/4-home03.jpg",
      "/assets/banner/4-home04.jpg",
      "/assets/banner/4-home05.jpg",
    ],
  ],
  reducers: {},
});

const store = configureStore({
  reducer: {
    HomeAll: HomeAll.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
