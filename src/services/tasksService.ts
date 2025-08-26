import { tasksApi } from './apiService';
import type { AppThunk, RootState } from '../store/store';
import type { Task } from '../types/task';
import { createSelector } from '@reduxjs/toolkit';
import { showSnackbar } from '../store/slices/snackbarSlice';

const selectTasksQuery = tasksApi.endpoints.getTasks.select();

export const selectAllTasks = createSelector(
  [selectTasksQuery],
  (query) => query.data ?? []
);

export const selectActiveTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((t) => !t.completed)
);

export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((t) => t.completed)
);

export const selectTaskFilter = (state: RootState) => state.tasksUI.filter;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTaskFilter],
  (tasks, filter): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed);
      case 'completed':
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }
);

export const selectAllCompleted = createSelector(
  [selectFilteredTasks],
  (tasks) => tasks.length > 0 && tasks.every((t) => t.completed)
);

export const deleteCompletedTasks =
  (): AppThunk => async (dispatch, getState) => {
    const completedTasks = selectCompletedTasks(getState());

    if (!completedTasks.length) return;

    const patchResult = dispatch(
      tasksApi.util.updateQueryData('getTasks', undefined, (draft) =>
        draft.filter((t) => !t.completed)
      )
    );

    try {
      await Promise.all(
        completedTasks.map((task) =>
          dispatch(tasksApi.endpoints.deleteTask.initiate(task.id)).unwrap()
        )
      );
    } catch {
      patchResult.undo();
      console.error('Failed to bulk delete completed tasks');
      dispatch(
        showSnackbar('Failed to bulk delete completed tasks. Please try again.')
      );
    }
  };

export const toggleAllTasks =
  (completed: boolean): AppThunk =>
  async (dispatch, getState) => {
    const tasks = selectAllTasks(getState());
    if (!tasks.length) return;

    const tasksToToggle = tasks.filter((t) => t.completed !== completed);
    if (!tasksToToggle.length) return;

    const patchResult = dispatch(
      tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
        draft.forEach((t) => {
          if (tasksToToggle.find((task) => task.id === t.id)) {
            t.completed = completed;
          }
        });
      })
    );

    try {
      await Promise.all(
        tasksToToggle.map((task) =>
          dispatch(
            tasksApi.endpoints.updateTaskCompletion.initiate({
              id: task.id,
              completed,
            })
          ).unwrap()
        )
      );
    } catch {
      patchResult.undo();
      console.error('Failed to bulk toggle tasks');
      dispatch(showSnackbar('Failed to bulk toggle tasks. Please try again.'));
    }
  };
