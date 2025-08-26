import { Box, Typography } from '@mui/material';
import type { FC, ReactElement } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  deleteCompletedTasks,
  selectAllTasks,
  selectCompletedTasks,
} from '../../services/tasksService';

type TableFooterProps = {
  isFilterActive: boolean;
};

const TableFooter: FC<TableFooterProps> = ({
  isFilterActive,
}): ReactElement => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectAllTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);

  const completedCount = completedTasks?.length ?? 0;
  const tasksCount = tasks?.length ?? 0;

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTasks());
  };

  return (
    <Box className="flex justify-between">
      <Typography variant="body2" color="textSecondary">
        {completedCount} / {tasksCount} completed
      </Typography>
      {!isFilterActive && !!completedCount && (
        <button
          className="text-sm text-red-500 cursor-pointer"
          onClick={handleDeleteCompleted}
        >
          Delete Completed
        </button>
      )}
    </Box>
  );
};

export default TableFooter;
