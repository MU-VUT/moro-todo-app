import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import snackbarReducer from './slices/snackbarSlice';
import { tasksApi } from '../services/apiService';

export const store = configureStore({
  reducer: {
    tasksUI: tasksReducer,
    snackbar: snackbarReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
