import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "components/BarChart/slice";
import commentsDrawerReducer from "components/CommentsDrawer/slice";

const store = configureStore({
  reducer: {
    chart: chartReducer,
    commentsDrawer: commentsDrawerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
