import { configureStore, createSlice } from "@reduxjs/toolkit";

const HomeAll = createSlice({
  name: "HomeAll",
  initialState: [
    "/assets/banner/1-best.jpg",
    "/assets/banner/1-coat.jpg",
    "/assets/banner/1-new.jpg",
    "/assets/banner/1-life.jpg",
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
