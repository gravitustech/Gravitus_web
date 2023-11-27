import { forwardRef } from 'react';

// @mui
import { Snackbar } from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

// ----------------------------------------------------------------------

const CustomSnackBar = ({ snackbarOpen, setSnackbarOpen, snackbarMessage, success }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%', backgroundColor: '#00BBAB', color: '#fff' }}
        >
          {snackbarMessage}
          {/* <Box display='flex'>
                        <Typography></Typography>
                        <CloseIcon sx={{ ml: 2, cursor: 'pointer' }} />
                    </Box> */}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CustomSnackBar;
