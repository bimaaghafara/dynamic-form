
import { Box, Snackbar, Alert } from '@mui/material';

export type SnackbarProps = {
  open?: boolean;
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
} | undefined;

type CustomSnackbarProps = {
  snackbar: SnackbarProps;
  setSnackbar: (e: SnackbarProps) => void;
}

const CustomSnackbar = ({
  snackbar,
  setSnackbar
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={snackbar?.open}
      autoHideDuration={5000}
      onClose={() => setSnackbar(undefined)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Box>
        {snackbar?.open && (
          <Alert
            onClose={() => setSnackbar(undefined)}
            severity={snackbar?.severity}
            sx={{ width: '100%' }}
          >
            {snackbar?.message}
          </Alert>
        )}
      </Box>
    </Snackbar>
  )
}

export default CustomSnackbar;
