import { Box, Typography } from '@mui/material';
import { Inbox } from '@mui/icons-material';
import type { FC, ReactElement } from 'react';
import type { TaskFilter } from '../../types/task';

type TasksEmptyStateProps = {
  filter: TaskFilter;
};

const TableEmpty: FC<TasksEmptyStateProps> = ({ filter }): ReactElement => {
  let message = 'No tasks found';
  if (filter === 'active') message = 'No active tasks';
  if (filter === 'completed') message = 'No completed tasks';

  return (
    <Box className="flex flex-col items-center justify-center h-64 text-gray-400">
      <Inbox className="w-16 h-16 mb-4" />
      <Typography variant="h6" className="text-center">
        {message}
      </Typography>
      {filter === 'all' && (
        <Typography variant="body2" className="text-center">
          Add a new task to get started
        </Typography>
      )}
    </Box>
  );
};

export default TableEmpty;
