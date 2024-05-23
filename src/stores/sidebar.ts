import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./index";

// Define a type for the slice state
interface SidebarState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: SidebarState = {
  isOpen: true,
};

export const sidebar = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setIsOpen } = sidebar.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.sidebar.isOpen;

export default sidebar.reducer;
