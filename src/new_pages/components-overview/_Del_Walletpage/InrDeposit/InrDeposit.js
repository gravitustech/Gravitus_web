import React, { useState,useEffect } from 'react';

import { Grid, Typography, Stack, OutlinedInput, FormHelperText, Button, TextField, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import Autocomplete from '@mui/material/Autocomplete';
import { Link as RouterLink } from 'react-router-dom';
import CardInr from '../InrWithdraw/Card';
import doticon from '../../../../assets/images/gravitusimage/doticon.svg';
import { NumericFormatCustom } from '../NumericFormatCustom';
import useSWR from 'swr';
import { fetcher, getWalletURLINRDeposit } from '../../../../api/wallet';
import InrDepositpage2 from './Inrdepositpage2';
import InrDepositpage3 from './Inrdepositpage3';
import InrDepositpage1 from './Inrdepositpage1';
import CustomSnackBar from 'src/components/snackbar';

const InrDeposit = () => {
  const theme = useTheme();
  const DepositMode = [{ DepositMode: 'IMPS' }];
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
        <InrDepositpage1
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
        <InrDepositpage2
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
        <InrDepositpage3
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
