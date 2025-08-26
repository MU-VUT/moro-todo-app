import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import type { FC, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import type { TaskFilter } from '../../types/task';
import {
  toggleAllTasks,
  selectAllTasks,
  selectActiveTasks,
  selectCompletedTasks,
} from '../../services/tasksService';

type TableHeaderProps = {
  filter: TaskFilter;
  onFilterChange: (f: TaskFilter) => void;
};

const TableHeader: FC<TableHeaderProps> = ({
  filter,
  onFilterChange,
}): ReactElement => {
  const dispatch = useAppDispatch();

  const allTasks = useAppSelector(selectAllTasks);
  const activeTasks = useAppSelector(selectActiveTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);

  const filteredTasks =
    filter === 'all'
      ? allTasks
      : filter === 'active'
        ? activeTasks
        : completedTasks;

  const allCompleted =
    filteredTasks.length > 0 && filteredTasks.every((t) => t.completed);

  const handleToggleAll = () => {
    if (!filteredTasks.length) return;
    dispatch(toggleAllTasks(!allCompleted));
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Tooltip title="Mark all as done" arrow placement="top">
        <Checkbox
          checked={allCompleted}
          onChange={handleToggleAll}
          disabled={!filteredTasks.length}
        />
      </Tooltip>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          label="Filter"
          onChange={(e) => onFilterChange(e.target.value as TaskFilter)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default TableHeader;
