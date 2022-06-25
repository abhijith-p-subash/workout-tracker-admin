import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const SnackBar = (props:any) => {
    const [close, setClose] = useState(false);  

    const handleCloseAlert = (
        event?: React.SyntheticEvent | Event,
        reason?: string
      ) => {
        if (reason === "clickaway") {
          return;
        }
    
        setClose(true);
      };
  return (
    <>
    {props.colour === "success" ? (
        <Snackbar
          open={close ? close:props.control}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            {props.msg}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
        open={close ? close:props.control}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {props.msg}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default SnackBar