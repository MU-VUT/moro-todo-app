import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TaskFilter } from '../../types/task';

interface TasksState {
  filter: TaskFilter;
}

const initialState: TasksState = {
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasksUI',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TaskFilter>) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
