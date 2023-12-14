import CustomSnackBar from '../../../../components/snackbar';
import InrWithdraw_EXT from './InrWithdraw_EXT';
import { useTheme } from '@mui/material';

import useSWR from 'swr';
import React, { useState } from 'react';
import { Pre_Rs_Withdraw, fetcherWallet } from 'src/api_ng/wallet_ng';

const InrWithdraw = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [formikValues, setFormikValues] = useState({});

  function useINR_Prewithdraw() {
    var postData = { walletId: 17 };

    const { data, error, isLoading } = useSWR([Pre_Rs_Withdraw(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: withdrawINRRc,
    error: withdrawINREr,
    isLoading: iswithdrawINRRcLoading
  } = useINR_Prewithdraw();

  if (withdrawINREr) {
    // Call Logout User
  }

  return (
    <>
      {withdrawINRRc && (
        <InrWithdraw_EXT
          inrWithdrawData={withdrawINRRc?.result}
          formikValues={formikValues}
          setFormikValues={setFormikValues}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          setStep={setStep}
          step={step}
        />
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default InrWithdraw;