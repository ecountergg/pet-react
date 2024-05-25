import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./index";

interface Breadcrumb {
  href: string;
  label: string;
}

// Define a type for the slice state
interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}

// Define the initial state using that type
const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

export const breadcrumb = createSlice({
  name: "breadcrumb",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBreadrumbs: (state, action: PayloadAction<Breadcrumb[]>) => {
      state.breadcrumbs = action.payload;
    },
  },
});

export const { setBreadrumbs } = breadcrumb.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.breadcrumb.breadcrumbs;

export default breadcrumb.reducer;
