import doticon from '../../../../assets/images/gravitusimage/doticon.svg';
import CardInr from '../InrWithdraw/Card';

import { Grid, Typography, Stack, Button, useTheme, Box } from '@mui/material';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import React, { useState } from 'react';

const InrDeposit_STEP2 = ({ depositFrom, depositTo, setStep, setFormikValues, formikValues, setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();
  const [termsError, setTermsError] = useState(false);
  // console.log('formikvalues', formikValues);

  const handleSubmit = () => {
    const allTermsChecked = formikValues.term1 && formikValues.term2 && formikValues.term3 && formikValues.term4;

    if (allTermsChecked) {
      setTermsError(false);
      setStep(3);
    } else {
      setTermsError(true);
      // setSnackbarMessage({ msg: 'Please check all terms', success: false });
      // setSnackbarOpen(true);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  return (
    <>
      <CardInr>
        <Box display="flex" alignItems="center" >
          <ArrowBackIosNewIcon
            onClick={handlePrev}
            sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
          />
          <Typography pb={0} pl={12} sx={{ textAlign: 'center' }} variant="h1" color="text.buy">
            INR Deposit
          </Typography>
        </Box>
        <Stack pt={2}>
          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Kindly re-check the details you have entered
          </Typography>
        </Stack>

        <Stack pt={2} spacing={3}>
          <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
            <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Deposit via bank transfer using deposit partners
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
            <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Amount you have to deposit:
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {formikValues?.depositAmount} INR
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
            <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Transferred via:
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {formikValues?.payMode}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
            <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Deposit via your linked bank account only. Deposits from any other account will not reflect in your balance.
            </Typography>
          </Stack>
        </Stack>

        <Stack pt={2}>
          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Kindly read and check all the boxes of each points below.
          </Typography>
        </Stack>

        <FormGroup>
          <Stack pt={2} spacing={1}>
            <Stack direction="row" style={{ alignItems: 'flex-start' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={formikValues.term1} value={formikValues.term1} onChange={(e) => setFormikValues({ ...formikValues, term1: e.target.checked })} />
                }
              />
              <Stack direction="row" pt={1} pl={-2}>
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Deposit partner for your request is
                  <span
                    style={{
                      color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
                      fontSize: '14px',
                      fontWeight: '700',
                      paddingLeft: '6px'
                    }}
                  >
                    GRAVITUS IT SERVICES PVT LTD.
                  </span>
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" style={{ alignItems: 'flex-start' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={formikValues.term2} value={formikValues.term2} onChange={(e) => setFormikValues({ ...formikValues, term2: e.target.checked })} />
                }
              />
              <Stack direction="row" pt={1}>
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Deposit bank details might change for every request.
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" style={{ alignItems: 'flex-start' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={formikValues.term3} value={formikValues.term3} onChange={(e) => setFormikValues({ ...formikValues, term3: e.target.checked })} />
                }
              />
              <Stack direction="row" pt={1}>
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Transfers to any other bank account will not be credited to your Gravitus balance.
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" style={{ alignItems: 'flex-start' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={formikValues.term4} value={formikValues.term4} onChange={(e) => setFormikValues({ ...formikValues, term4: e.target.checked })} />
                }
              />
              <Stack direction="row" pt={1}>
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Transfer only from your registered bank accounts. Transfers from any other bank account will be reversed only after 10
                  days.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </FormGroup>
        <Stack pt={1}>
          {termsError && <span style={{ color: 'red' }}>Please check all terms*</span>}
        </Stack>

        <Stack pt={1}>
          <Grid item xs={12} pt={3}>
            <AnimateButton>
              <Button disableElevation fullWidth size="large" variant="contained" onClick={handleSubmit}>
                SUBMIT
              </Button>
            </AnimateButton>
          </Grid>
        </Stack>
      </CardInr>
    </>
  );
};

export default InrDeposit_STEP2;