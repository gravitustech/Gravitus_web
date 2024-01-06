import React, { useState, useEffect, useRef } from 'react'
import {
  Typography,
  Stack,
  Button,
  useTheme,
  Grid,
  FormHelperText,
  OutlinedInput,
  Divider,
  InputAdornment,
  Dialog,
  CircularProgress,
} from '@mui/material';
import DialogBoxValue from 'src/new_pages/components-overview/Spotpage/BuySellGrid/Dialog_Box_Val';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router';

import { socket } from '../../../../../socket';
import { getConfig_sp, setConfig_ng } from 'src/utils_ng/localStorage_ng';
import { P2P_MatchTrade_URL, postDataP2P } from 'src/api_ng/peer2peer_ng';

const FormField = ({ pairInfo, row, setSnackbarOpen, setSnackbarMessage, handleCancelClick }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const formikMatchBuy = useRef();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCustomChange = (e, setFieldValue,) => {
    // Handle numeric input with decimal point
    let numericValue = e.target.value.replace(/[^0-9.]/g, '');

    const decimalCount = (numericValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      // More than one decimal point found, remove the extras
      numericValue = numericValue.replace(/\./g, (_, i) => (i === numericValue.lastIndexOf('.') ? '.' : ''));
    }

    // Handle 'quantity' and 'totalamount'
    if (e.target.name === 'quantity') {
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairInfo?.quantityFloat) {
        parts[1] = parts[1].substring(0, pairInfo?.quantityFloat);
        numericValue = parts.join('.');
      }

      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * parseFloat(row.price)).toFixed(2).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('quantity', numericValue);
      setFieldValue('totalamount', secondValue);
    }

    if (e.target.name === 'totalamount') {
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairInfo?.amountFloat) {
        parts[1] = parts[1].substring(0, pairInfo?.amountFloat);
        numericValue = parts.join('.');
      }

      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue / parseFloat(row.price)).toFixed(2).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('totalamount', numericValue);
      setFieldValue('quantity', secondValue);
    }
  };

  // Inputs
  const [inputs, setInputs] = useState({ totalamount: 0, quantity: 0 });

  const handleAllClick = (setFieldValue) => {
    const totalQuantity = row.quantity; // Replace with your logic
    setFieldValue('quantity', totalQuantity);

    const totalAmount = row.amount; // Replace with your logic
    setFieldValue('totalamount', totalAmount);
  }

  const handleConfirm = () => {
    setIsLoading(true);
    var postData = {
      platformId: pairInfo.id,
      side: 1,
      rQuantity: inputs.quantity,
      amount: inputs.totalamount,
      matchId: row.matchId
    };
    setIsLoading(true);
    postDataP2P(P2P_MatchTrade_URL(), postData).then(function (res) {
      console.log(res);

      if (res.error !== 'ok') {
        handleCloseDialog();
        setIsLoading(false);

        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else if (res.error.action != undefined) {
            setSnackbarMessage({ msg: res.error.message, success: false });
            setSnackbarOpen(true);
            if (res.error.message === 'Update your identity') {
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
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        // Do nothing wait for sock response, Timeout after 5 seconds if no ressponse
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  };

  useEffect(() => {
    let P2PMatchEvt = '/P2PMatch_' + getConfig_sp().userId + '/POST';
    socket.on(P2PMatchEvt, function (res) {

      setIsLoading(false);
      handleCloseDialog();

      // console.log(res);
      if (res.error != 'ok') {
        setSnackbarMessage({ msg: res.error, success: false });
        setSnackbarOpen(true);
      }
      else {
        setConfig_ng('P2POrderDts', res.result.orderId);
        setSnackbarMessage({ msg: 'Order matched successfully', success: false });
        setSnackbarOpen(true);

        setInputs({ quantity: '', totalamount: '', paymentoption: [] });
        // Mutate listing page if necessary

        formikMatchBuy?.current?.resetForm({
          values: {
            quantity: '',
            totalamount: ''
          }
        });

        // Move to Buy or Sell OrderDetails
        if (res.result.buyerId === getConfig_sp().userId) {
          navigate('/Buyer_Trade_Dts', { state: { orderId: res.result.orderId } });
        } else if (res.result.sellerId === getConfig_sp().userId) {
          navigate('/Seller_Trade_Dts', { state: { orderId: res.result.orderId } });
        }
      }
    });

    return () => {
      socket.off(P2PMatchEvt);
    };

  }, []);

  return (
    < >
      <Stack pl={{ xs: 0, sm: 0, md: 2, lg: 2 }} pr={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
        <Formik
          innerRef={formikMatchBuy}
          initialValues={{
            totalamount: '',
            quantity: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            totalamount: Yup.number().required("Don't leave empty").positive('Enter a positive number').test(
              'minimum-amount',
              'Ensure that the total amount remains within the order amount limit.',
              (value) => parseFloat(value) <= (row.amount)
            ).test(
              'minimum-amount',
              'Minimum amount must be at least ₹ 500',
              (value) => parseFloat(value) >= 500
            ),
            quantity: Yup.number().positive('Enter a positive number').required("Don't leave empty")
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            handleClickOpenDialog();
            try {
              setInputs(values);
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Grid>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          Quantity
                        </Typography>
                        {/* <Typography
                          variant="body1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          Balance : 1000 USDT
                        </Typography> */}
                      </Stack>
                    </Grid>
                    <OutlinedInput
                      id="quantity"
                      type="quantity"
                      value={values.quantity}
                      name="quantity"
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                      placeholder=""
                      fullWidth
                      error={Boolean(touched.quantity && errors.quantity)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Stack direction='row' spacing={2}>
                            <Typography
                              onClick={() => handleAllClick(setFieldValue)}
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy', cursor: 'pointer' }}
                            >
                              All
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {pairInfo.buyPair}
                            </Typography>
                          </Stack>
                          {/* <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {pairInfo.buyPair}
                          </Typography> */}
                        </InputAdornment>
                      }
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText error id="standard-weight-helper-text-quantity">
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </Stack>

                  <Stack spacing={1} pt={{ xs: 1, sm: 1, md: 3, lg: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                    >
                      Total Amount
                    </Typography>
                    <OutlinedInput
                      id="totalamount-login"
                      type="totalamount"
                      value={values.totalamount}
                      name="totalamount"
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                      placeholder={row.TotalAmount}
                      fullWidth
                      error={Boolean(touched.totalamount && errors.totalamount)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {pairInfo.sellPair}
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {touched.totalamount && errors.totalamount && (
                      <FormHelperText error id="standard-weight-helper-text-totalamount-login">
                        {errors.totalamount}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={3} pt={{ xs: 0.5, sm: 0.5, md: 3, lg: 3 }}>
                    <Button onClick={handleCancelClick} variant="cancelbutton">
                      Cancel
                    </Button>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      type="submit"
                      variant="buybutton"
                    // onClick={handleClickOpenDialog}
                    >
                      Buy {pairInfo.buyPair}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
          <Stack p={4} spacing={2.5} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="title1" sx={{ color: 'text.buy' }}>
                Buy {pairInfo.buyPair}
              </Typography>
              <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                P2P Order
              </Typography>
            </Stack>
            <Divider>
            </Divider>
            <DialogBoxValue
              title='Price'
              value={row.price}
              pair={pairInfo.sellPair}
            />
            <DialogBoxValue
              title='Quantity'
              value={inputs.quantity}
              pair={pairInfo.buyPair}
            />
            <Divider></Divider>
            <DialogBoxValue
              title='Total Amount'
              value={inputs.totalamount}
              pair={pairInfo.sellPair}
            />
            <Divider></Divider>
            <Stack pt={1} direction='row' spacing={2} justifyContent='space-between'>
              <Button variant="contained5" onClick={handleCloseDialog} >
                Cancel
              </Button>
              <Button
                // component={RouterLink}
                // to="/buyorderpage"
                variant="contained4"
                onClick={() => handleConfirm()}
              >
                {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
              </Button>
            </Stack>
          </Stack>

          {/* <Stack p={4} spacing={2.5} alignItems="center">
            <img src={ordersuccessgif} alt='ordersuccessgif' width={60} />
            <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Order matched successfully
            </Typography>
          </Stack> */}

        </Dialog>
      </Stack>
    </ >
  )
}

export default FormField
