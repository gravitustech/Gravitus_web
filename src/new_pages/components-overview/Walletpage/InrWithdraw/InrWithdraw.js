import React, { useState } from 'react';
import { useTheme } from '@mui/material';

import InrWithdraw_EXT from './InrWithdraw_EXT';
import InrWithdraw_SP from './InrWithdraw_SP';
import CustomSnackBar from '../../../../components/snackbar';
import CardInr from './Card';

import useSWR from 'swr';
import { fetcher, getWalletURLINRWidthdraw } from '../../../../api/wallet';
import { getSecurityURL } from '../../../../api/profile';
import { Pre_Rs_Withdraw, fetcherWallet } from 'src/api_ng/wallet_ng';
import { Security_URL, fetcherSystem } from 'src/api_ng/system_ng';

const InrWithdraw = () => {

  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [formikValues, setFormikValues] = useState({});

  // //Govardhan code
  // const { data, error, isLoading } = useSWR(
  //   getWalletURLINRWidthdraw(),
  //   (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { walletId: 17 } })
  //   // { suspense: true }
  // );

  //govardhan code
  // const { data: securityData, mutate } = useSWR(
  //   getSecurityURL(),
  //   (url) => fetcher(url, { accountType: 'GRAVITUS' })
  //   // { suspense: true }
  // );

  //Gravitus Team
  var superData = null;

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
    isLoading: iswithdrawINRDataLoading
  } = useINR_Prewithdraw();

  if (withdrawINREr) {
    // Call Logout User
  }
  else {
    superData = withdrawINRRc?.result;
  }

  // console.log('withdraw', withdrawINRRc)

  //Gravitus Team
  function useSecurity_URL() {
    const { data, error, isLoading } = useSWR([Security_URL(), {}], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: securityRc,
    error: securityEr,
    isLoading: issecurityDataLoading
  } = useSecurity_URL();

  if (withdrawINREr) {
    // Call Logout User
  }
  else {
    securityRc?.result;
  }

  // console.log('securityRc', securityRc)

  return (
    <>
      {withdrawINRRc && securityRc && (
        <InrWithdraw_EXT
          inrWithdrawData={withdrawINRRc?.result}
          setFormikValues={setFormikValues}
          formikValues={formikValues}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          setStep={setStep}
          step={step}
          securityData={securityRc?.result}
        />
      )}
      {/* {data && step === 2 && (
        <InrWithdraw_SP
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
