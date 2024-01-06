import React, { useState, useEffect, useRef } from 'react';
import ordersuccessgif from '../../../../../assets/images/gravitusimage/ordersuccesgif.svg';

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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import DialogBoxValue from 'src/new_pages/components-overview/Spotpage/BuySellGrid/Dialog_Box_Val';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router';

import { socket } from '../../../../../socket';
import { getConfig_sp, setConfig_ng } from 'src/utils_ng/localStorage_ng';
import { P2P_MatchTrade_URL, postDataP2P } from 'src/api_ng/peer2peer_ng';

const Sell_FormField = ({ walletInfo, pfStatus, pairInfo, row, setSnackbarOpen, setSnackbarMessage, handleCancelClick }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const formikMatchSell = useRef();

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
      // console.log('added', parseFloat(numericValue), values);
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairInfo?.quantityFloat) {
        parts[1] = parts[1].substring(0, pairInfo?.quantityFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * parseFloat(row.price)).toFixed(2).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('quantity', numericValue);
      setFieldValue('totalamount', secondValue);
      // console.log('orderBookData.price', row.price)
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
  const [inputs, setInputs] = useState({ quantity: '', totalamount: '', paymentoption: [] });

  // Update Sell Tds
  const SellTds = (parseFloat(inputs.quantity) - (parseFloat(inputs.quantity) * 0.010)).toFixed(pairInfo?.quantityFloat);

  const handleAllClick = (setFieldValue) => {
    const totalQuantity = row.quantity; // Replace with your logic
    setFieldValue('quantity', totalQuantity);

    const totalAmount = row.amount; // Replace with your logic
    setFieldValue('totalamount', totalAmount);
  }

  const handleConfirm = () => {
    var postData = {
      platformId: pairInfo.id,
      matchId: row.matchId,
      side: 2,
      rQuantity: inputs.quantity,
      amount: inputs.totalamount,
      paymodes: inputs.paymentoption.map((mode) => ({ mode: mode, checked: true })),
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

        formikMatchSell?.current?.resetForm({
          values: {
            quantity: '',
            totalamount: '',
            paymentoption: []
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
          innerRef={formikMatchSell}
          initialValues={{
            totalamount: '',
            quantity: '',
            paymentoption: '',
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
            quantity: Yup.number().positive('Enter a positive number').required("Don't leave empty"),
            paymentoption: Yup.array()
              .min(1, 'Please select a payment option')
              .required('Please select a payment option'),
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
                  <Stack spacing={1} >
                    <Grid>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          Quantity
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          Balance : {walletInfo?.buyPair} {pairInfo?.buyPair}
                        </Typography>
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

                  <Stack pt={{ xs: 0.5, sm: 0.5, md: 3, lg: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                    >
                      Payment Options
                    </Typography>
                    <FormGroup>
                      <Stack direction="row" spacing={5}  pt={{ xs: 0.5, sm: 0.5, md: 2, lg: 2 }}>
                        {pfStatus?.modes
                          .filter(
                            (paymentMode) =>
                              paymentMode.mode === 'UPI' || paymentMode.mode === 'IMPS'
                          )
                          .map((paymentMode, index) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  name="paymentoption"
                                  value={paymentMode.mode}
                                  onChange={handleChange}
                                />
                              }
                              label={paymentMode.mode}
                            />
                          ))}
                      </Stack>
                      {touched.paymentoption && errors.paymentoption && (
                        <FormHelperText error id="standard-weight-helper-text-totalamount-paymentoption">
                          {errors.paymentoption}
                        </FormHelperText>
                      )}
                    </FormGroup>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={3} pt={{ xs: 0.5, sm: 0.5, md: 1.5, lg: 1.5 }}>
                    <Button onClick={handleCancelClick} variant="cancelbutton">
                      Cancel
                    </Button>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      type="submit"
                      variant="sellbutton"
                    >
                      Sell {pairInfo.buyPair}
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
              <Typography variant="title1" sx={{ color: 'text.sell' }}>
                Sell {pairInfo.buyPair}
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
            <DialogBoxValue
              title='After TDS 1%'
              value={SellTds}
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
                // to="/sellorderpage"
                onClick={() => handleConfirm()}
                variant="confirmsell">
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

export default Sell_FormField;
