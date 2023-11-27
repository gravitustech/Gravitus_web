import React, { useState } from 'react';
import CardInr from './Card';

import { useTheme } from '@mui/material';

import useSWR from 'swr';
import { fetcher, getWalletURLINRWidthdraw } from '../../../../api/wallet';
import InrWithdrawpage1 from './InrWithdrawpage1';
import InrWithdrawpage2 from './InrWithdrawpage2';
import CustomSnackBar from '../../../../components/snackbar';
import { getSecurityURL } from '../../../../api/profile';

const InrWithdraw = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [formikValues, setFormikValues] = useState({});

  const Accounts = [
    { BankName: 'ICIC', AcNumber: '15789385126215' },
    { BankName: 'SBI', AcNumber: '36976556226542' }
  ];

  const { data, error, isLoading } = useSWR(
    getWalletURLINRWidthdraw(),
    (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { walletId: 17 } })
    // { suspense: true }
  );
  const { data: securityData, mutate } = useSWR(
    getSecurityURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );
  // console.log('res', data, error, isLoading);

  return (
    <>
      {data && securityData && (
        <InrWithdrawpage1
          inrWithdrawData={data?.result}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          setStep={setStep}
          step={step}
          securityData={securityData?.result}
        />
      )}
      {/* {data && step === 2 && (
        <InrWithdrawpage2
          inrWithdrawData={data?.result}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          setStep={setStep}
        />
      )} */}
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
