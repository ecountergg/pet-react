import { configureStore } from "@reduxjs/toolkit";

import { breadcrumb } from "./breadcrumb";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    breadcrumb: breadcrumb.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>();
