import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModalState {
  title: string;
  description?: string;
  body: string;
}

// Define a type for the slice state
export interface IDialogState {
  isOpen: boolean;
  loading: boolean;
  modalState: IModalState;
}

export type SetDialogPayload = Omit<IDialogState, "loading">;

// Define the initial state using that type
const initialState: IDialogState = {
  isOpen: false,
  loading: false,
  modalState: {
    title: "",
    description: "",
    body: "",
  },
};

export const alertDialog = createSlice({
  name: "alertDialog",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<SetDialogPayload>) => {
      state.isOpen = action.payload.isOpen;
      state.modalState = action.payload.modalState;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetDialog: (state) => {
      state.isOpen = false;
      state.loading = false;
      state.modalState = {
        title: "",
        description: "",
        body: "",
      };
    },
  },
});

export const { setDialog, setLoading, resetDialog } = alertDialog.actions;

export default alertDialog.reducer;
