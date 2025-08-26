import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { hideSnackbar } from '../../store/slices/snackbarSlice';

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch();
  const { open, message } = useAppSelector((state) => state.snackbar);

  const handleClose = () => dispatch(hideSnackbar());

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
