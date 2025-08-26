import { Box, Button, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import type { FC, ReactElement } from 'react';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState: FC<ErrorStateProps> = ({
  message = 'Something went wrong.',
  onRetry,
}): ReactElement => {
  return (
    <Box className="flex flex-col items-center justify-center p-8 gap-4 text-center">
      <ErrorOutline className="text-red-500 !w-16 !h-16" />
      <Typography variant="h6" className="text-red-600">
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          className="mt-2"
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
