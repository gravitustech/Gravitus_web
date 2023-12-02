import React, { useState,useEffect } from 'react';

import InrDeposit_STEP1 from './InrDeposit_STEP1';
import InrDeposit_STEP2 from './InrDeposit_STEP2';
import InrDeposit_STEP3 from './InrDeposit_STEP3';
import CustomSnackBar from 'src/components/snackbar';

import useSWR from 'swr';
import { fetcher, getWalletURLINRDeposit } from '../../../../api/wallet';

const InrDeposit = () => {

  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [formikValues, setFormikValues] = useState({ term1: false, term2: false, term3: false, term4: false });

  const { data, error, isLoading } = useSWR(
    getWalletURLINRDeposit(),
    (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { walletId: 17 } })
    // { suspense: true }
  );

  console.log('res', data, error, isLoading);
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleOpen()
  }, [])
  
  return (
    <>
      {step === 1 && data && (
        <InrDeposit_STEP1
          depositFrom={data.result.depositFrom}
          depositTo={data.result.depositTo}
          setStep={setStep}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
      )}
      {step === 2 && data && (
        <InrDeposit_STEP2
          depositFrom={data.result.depositFrom}
          depositTo={data.result.depositTo}
          setStep={setStep}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      )}
      {step === 3 && data && (
        <InrDeposit_STEP3
          depositFrom={data.result.depositFrom}
          depositTo={data.result.depositTo}
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
