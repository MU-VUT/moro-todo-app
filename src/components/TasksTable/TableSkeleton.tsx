import { Box, List, Paper, Skeleton, Stack } from '@mui/material';
import type { FC, ReactElement } from 'react';

const TableSkeleton: FC = (): ReactElement => {
  const rows = Array.from({ length: 5 });

  return (
    <Paper className=" flex flex-col divide-y divide-gray-300">
      <Box className="pl-4 py-1 pr-1">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="rectangular" width={120} height={36} />
        </Stack>
      </Box>

      <List className="flex-1 max-h-96 overflow-auto">
        {rows.map((_, idx) => (
          <Box key={idx} className="flex items-center gap-2 px-4 py-2">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rectangular" className="flex-1 h-5" />
            <Stack direction="row" spacing={1}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="circular" width={36} height={36} />
            </Stack>
          </Box>
        ))}
      </List>

      <Box className="p-4 flex justify-between">
        <Skeleton variant="text" width={80} height={24} />
        <Skeleton variant="rectangular" width={100} height={28} />
      </Box>
    </Paper>
  );
};

export default TableSkeleton;
