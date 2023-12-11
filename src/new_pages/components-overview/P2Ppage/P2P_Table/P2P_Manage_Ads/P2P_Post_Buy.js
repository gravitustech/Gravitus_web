import React, { useState, useRef } from 'react';
import useSWR, { mutate } from 'swr';

import { useTheme, Stack, Typography, Grid, FormHelperText,
  OutlinedInput, Button, InputAdornment, Checkbox, FormGroup,
  FormControlLabel, Dialog, Divider } from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { P2P_PostOrder_URL, P2P_SuperOrders_URL, postDataP2P } from 'src/api_ng/peer2peer_ng';

const P2P_Post_Buy = ({ pfStatus, priceInfo, pairInfo, walletInfo, setSnackbarOpen, setSnackbarMessage, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  const theme = useTheme();
  const formikPostBuy = useRef();
  
  var formikInit = {
    price: priceInfo?.lastPrice,
    quantity: '',
    totalamount: '',
    submit: null
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCustomChange = (e, setFieldValue, values,) => {
    // Handle numeric input with decimal point
    let numericValue = e.target.value.replace(/[^0-9.]/g, '');

    const decimalCount = (numericValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      // More than one decimal point found, remove the extras
      numericValue = numericValue.replace(/\./g, (_, i) => (i === numericValue.lastIndexOf('.') ? '.' : ''));
    }

    if (e.target.name === 'price') {
      // console.log('added', parseFloat(numericValue), values);
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairInfo?.priceFloat) {
        parts[1] = parts[1].substring(0, pairInfo?.priceFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * (values?.quantity)).toFixed(pairInfo?.priceFloat).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('price', numericValue);
      setFieldValue('totalamount', secondValue);
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
      const secondValue = isNaN(firstValue) ? '' : (firstValue * parseFloat(values?.price)).toFixed(2).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
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
      const secondValue = isNaN(firstValue) ? '' : (firstValue / parseFloat(values?.price)).toFixed(2).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('totalamount', numericValue);
      setFieldValue('quantity', secondValue);
    }
  };

  const [inputs, setInputs] = useState({
    price: '',
    quantity: '',
    totalamount: '',
  });

  // console.log(inputs, 'Set Inputs');

  const handleConfirm = () => {
    setIsLoading(true);
    var postData = {
      platformId: pairInfo.id,
      side: 1,
      price: inputs.price,
      quantity: inputs.quantity,
      amount: inputs.totalamount,
    };

    postDataP2P(P2P_PostOrder_URL(), postData).then(function (res) {
      setIsLoading(false);
      handleCloseDialog();

      console.log(res);
      if (res.error !== 'ok') {
        if(res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if(res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        setSnackbarMessage({ msg: 'Order Created successfully', success: false });
        setSnackbarOpen(true);
        
        setInputs({ price: '', quantity: '', totalamount: '' });
        mutate(P2P_SuperOrders_URL);

        formikPostBuy.current.resetForm({values : { 
          price: '', 
          quantity: '', 
          totalamount: '' 
        }});
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  };

  return (
    <Stack>
      <Formik
        innerRef={formikPostBuy}
        initialValues={formikInit}
        validationSchema={Yup.object().shape({
          price: Yup.number().positive('Enter a positive number').required("Don't leave empty"),
          quantity: Yup.number().positive('Enter a positive number').required("Don't leave empty"),
          totalamount: Yup.number().positive('Enter a positive number').required("Don't leave empty").test(
            'minimum-amount',
            'Minimum amount must be at least ₹ 500',
            (value) => parseFloat(value) >= 500
          ),
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
        enableReinitialize
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    Price
                  </Typography>
                  <OutlinedInput
                    id="price"
                    type="price"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          {pairInfo?.sellPair}
                        </Typography>
                      </InputAdornment>
                    }
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    Quantity
                  </Typography>

                  <OutlinedInput
                    id="quantity"
                    type="quantity"
                    value={values.quantity}
                    name="quantity"
                    onBlur={handleBlur}
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched.quantity && errors.quantity)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          {pairInfo?.buyPair}
                        </Typography>
                      </InputAdornment>
                    }
                  />
                  {touched.quantity && errors.quantity && (
                    <FormHelperText error id="standard-weight-helper-text-quantity">
                      {errors.quantity}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
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
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder=''
                    fullWidth
                    error={Boolean(touched.totalamount && errors.totalamount)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          {pairInfo?.sellPair}
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
                <Stack direction="row" spacing={3} pt={3}>
                  <Button
                    size='large'
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                    variant="managepostbuybutton"
                  >
                    Post Buy Ad
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
        <Stack p={4} spacing={2.8}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="title1" sx={{ color: 'text.buy' }}>
              Buy USDT
            </Typography>
            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              P2P Order
            </Typography>
          </Stack>

          <Divider></Divider>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Price
            </Typography>
            <Typography
              variant="title2"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            >
              {inputs.price} {pairInfo?.sellPair}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Quantity
            </Typography>
            <Typography
              variant="title2"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            >
              {inputs.quantity} {pairInfo?.buyPair}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Total Amount
            </Typography>
            <Typography
              variant="title2"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            >
              {inputs.totalamount} {pairInfo?.sellPair}
            </Typography>
          </Stack>

          <Divider></Divider>

          <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained5" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="contained4" onClick={handleConfirm}>Confirm</Button>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  )
}

export default P2P_Post_Buy;