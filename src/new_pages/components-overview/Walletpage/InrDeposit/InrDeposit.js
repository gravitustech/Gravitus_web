import React, { useState, useEffect } from 'react';

import InrDeposit_STEP1 from './InrDeposit_STEP1';
import InrDeposit_STEP2 from './InrDeposit_STEP2';
import InrDeposit_STEP3 from './InrDeposit_STEP3';
import CustomSnackBar from 'src/components/snackbar';

import useSWR from 'swr';
import { Pre_Rs_Deposit, fetcherWallet } from 'src/api_ng/wallet_ng';

const InrDeposit = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [formikValues, setFormikValues] = useState({ term1: false, term2: false, term3: false, term4: false });
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    handleOpen();
  }, [])

  // console.log('walletINRRc',walletINRRc)
  return (
    <>
      {step === 1 && walletINRRc && (
        <InrDeposit_STEP1
          depositFrom={walletINRRc.result.depositFrom}
          depositTo={walletINRRc.result.depositTo}
          setStep={setStep}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
      )}
      {step === 2 && walletINRRc && (
        <InrDeposit_STEP2
          depositFrom={walletINRRc.result.depositFrom}
          depositTo={walletINRRc.result.depositTo}
          setStep={setStep}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      )}
      {step === 3 && walletINRRc && (
        <InrDeposit_STEP3
          depositFrom={walletINRRc.result.depositFrom}
          depositTo={walletINRRc.result.depositTo}
          setStep={setStep}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          walletId={17}
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

export default InrDeposit;
