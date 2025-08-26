// store/snackbarSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  message: string | null;
  open: boolean;
}

const initialState: SnackbarState = {
  message: null,
  open: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.open = true;
    },
    hideSnackbar(state) {
      state.open = false;
      state.message = null;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
