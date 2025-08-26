import { Box, List, Paper } from '@mui/material';
import type { FC, ReactElement } from 'react';
import { useMemo, useState } from 'react';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableItem from './TableItem';
import TableSkeleton from './TableSkeleton';
import TableEmpty from './TableEmpty';
import { useAppSelector } from '../../hooks/hooks';
import type { TaskFilter } from '../../types/task';
import {
  selectAllTasks,
  selectActiveTasks,
  selectCompletedTasks,
} from '../../services/tasksService';
import { useGetTasksQuery } from '../../services/apiService';
import ErrorState from '../common/ErrorState';

const TasksTable: FC = (): ReactElement => {
  const { isLoading, error, refetch } = useGetTasksQuery();
  const [filter, setFilter] = useState<TaskFilter>('all');

  const allTasks = useAppSelector(selectAllTasks);
  const activeTasks = useAppSelector(selectActiveTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return activeTasks;
      case 'completed':
        return completedTasks;
      default:
        return allTasks;
    }
  }, [allTasks, activeTasks, completedTasks, filter]);

  if (error)
    return <ErrorState message="Failed to load tasks" onRetry={refetch} />;
  if (isLoading) return <TableSkeleton />;
  if (!allTasks.length) return <TableEmpty filter={filter} />;

  return (
    <Paper className="flex flex-col divide-y divide-gray-300">
      <Box className="pl-4 py-1 pr-1">
        <TableHeader filter={filter} onFilterChange={setFilter} />
      </Box>

      {!filteredTasks.length ? (
        <TableEmpty filter={filter} />
      ) : (
        <List className="flex-1 max-h-96 overflow-auto">
          {filteredTasks.map((task) => (
            <TableItem key={task.id} task={task} />
          ))}
        </List>
      )}

      <Box className="p-4">
        <TableFooter isFilterActive={filter === 'active'} />
      </Box>
    </Paper>
  );
};

export default TasksTable;
