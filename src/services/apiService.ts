import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '../types/task';
import { showSnackbar } from '../store/slices/snackbarSlice';

const BASE_URL = import.meta.env.VITE_API_URL;

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks',
      providesTags: ['Tasks'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          dispatch(showSnackbar('Failed to fetch tasks.'));
        }
      },
    }),

    addTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task,
      }),
      async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();

        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            draft.unshift({
              id: tempId,
              text: newTask.text!,
              completed: false,
            });
          })
        );

        try {
          const { data: realTask } = await queryFulfilled;
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === tempId);
              if (index !== -1) draft[index] = realTask;
            })
          );
        } catch {
          patchResult.undo();
          console.error('Failed to add task');
          dispatch(showSnackbar('Failed to add task. Please try again.'));
        }
      },
    }),

    updateTask: builder.mutation<Task, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `tasks/${id}`,
        method: 'POST',
        body: { text },
      }),
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const task = draft.find((t) => t.id === id);
            if (task) task.text = text;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          console.error('Failed to update task');
          dispatch(showSnackbar('Failed to update task. Please try again.'));
        }
      },
    }),

    deleteTask: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const index = draft.findIndex((t) => t.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          console.error('Failed to delete task');
          dispatch(showSnackbar('Failed to delete task. Please try again.'));
        }
      },
    }),

    updateTaskCompletion: builder.mutation<
      Task,
      { id: string; completed: boolean }
    >({
      query: ({ id, completed }) => ({
        url: `tasks/${id}/${completed ? 'complete' : 'incomplete'}`,
        method: 'POST',
      }),
      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const task = draft.find((t) => t.id === id);
            if (task) task.completed = completed;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          console.error('Failed to toggle task completion');
          dispatch(
            showSnackbar('Failed to toggle task completion. Please try again.')
          );
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskCompletionMutation,
} = tasksApi;
