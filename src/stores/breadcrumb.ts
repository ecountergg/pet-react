import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./index";

export interface IBreadcrumb {
  href: string;
  label: string;
}

// Define a type for the slice state
export interface IBreadcrumbState {
  items: IBreadcrumb[];
}

// Define the initial state using that type
const initialState: IBreadcrumbState = {
  items: [],
};

export const breadcrumb = createSlice({
  name: "breadcrumb",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBreadrumbs: (state, action: PayloadAction<IBreadcrumb[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setBreadrumbs } = breadcrumb.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBreadcrumbs = (state: RootState) => state.breadcrumb.items;

export default breadcrumb.reducer;
