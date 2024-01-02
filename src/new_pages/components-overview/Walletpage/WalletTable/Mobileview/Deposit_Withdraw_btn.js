import React from 'react';
import { Button, Paper, Stack, useTheme } from '@mui/material';

import useSWR from 'swr';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Pre_Rs_Deposit, fetcherWallet } from 'src/api_ng/wallet_ng';

const Deposit_Withdraw_btn = ({ walletId, setSnackbarOpen, setSnackbarMessage }) => {
  const navigate = useNavigate();

  function useINR_Predeposit() {
    var postData = { walletId: 17 };

    const { data, error, isLoading } = useSWR([Pre_Rs_Deposit(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletINRRc,
    error: walletINREr,
    isLoading: isWALLETINRDataLoading
  } = useINR_Predeposit();

  if (walletINREr) {
    // Call Logout User
  }

  const INRdepositButton = () => {
    // Your condition to determine the route
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
          if (walletINRRc.error.message === 'Update your identity') {
            const myTimeout = setTimeout(() => {
              navigate('/profile/useridentity');
            }, 1000);
            return () => clearTimeout(myTimeout);
          } else {
            const myTimeout = setTimeout(() => {
              navigate('/profile/payment')
            }, 1000);
            return () => clearTimeout(myTimeout);
          }
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
    } else {
      navigate('/inrdeposit');
    }
  };

  const INRwithdrawButton = () => {
    // Your condition to determine the route
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
          if (walletINRRc.error.message === 'Update your identity') {
            const myTimeout = setTimeout(() => {
              navigate('/profile/useridentity');
            }, 1000);
            return () => clearTimeout(myTimeout);
          } else {
            const myTimeout = setTimeout(() => {
              navigate('/profile/payment')
            }, 1000);
            return () => clearTimeout(myTimeout);
          }
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
    } else {
      navigate('/inrwithdraw');
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={0}
    >
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Stack direction='row' spacing={1} p={2}>
            {walletId === 17 ? (
              <>
                <Button variant="spotbuybutton"
                  onClick={INRdepositButton}
                  state={{ walletId: walletId }}
                >
                  Deposit
                </Button>
              </>
            ) : (
              <>
                <Button variant="spotbuybutton"
                  component={RouterLink}
                  to={'/deposit'}
                  state={{ walletId: walletId }}
                >
                  Deposit
                </Button>
              </>
            )}

            {walletId === 17 ? (
              <>
                <Button variant="spotsellbutton"
                  onClick={INRwithdrawButton}
                  state={{ walletId: walletId }}
                >
                  Withdraw
                </Button>
              </>
            ) : (
              <>
                <Button variant="spotsellbutton"
                  component={RouterLink}
                  to={'/withdraw'}
                  state={{ walletId: walletId }}
                >
                  Withdraw
                </Button>
              </>
            )}
          </Stack>
        </React.Fragment>
      ))}
    </Paper>
  )
}

export default Deposit_Withdraw_btn;
