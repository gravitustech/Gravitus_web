import React, { useState, useRef, useEffect } from 'react';

import {
  useTheme, Stack, Grid, Button, FormHelperText, OutlinedInput,
  Typography, ButtonBase, Divider, CircularProgress,
  Tooltip, InputAdornment, Slider, Dialog,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Dialogboxvalue from './Dialogboxvalue';

import { postOrder } from '../../../../api/spot';
import { Spot_PostOrder_URL, postDataSPOT } from 'src/api_ng/spotTrade_ng';

//
import { Spot_PreTrade_URL, fetcherSPOT } from 'src/api_ng/spotTrade_ng';

import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../utils_ng/localStorage_ng';
import { socket } from '../../../../socket';
import useSWR, { mutate } from 'swr';

const CustomSlider = styled(Slider)(({ theme, flag }) => ({
  color: `${flag ? '#D9D9D9' : '#D9D9D9'}`,
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    color: `${flag ? '#00BBAB' : '#FF4E4E'}`
  },
  '& .MuiSlider-track': {
    backgroundColor: `${flag ? '#00BBAB' : '#FF4E4E'}`
  }
}));

const BuySelloder = ({
  isAuthorised,
  priceData,
  pairData,
  selectedOrder,
  setSelectedOrder,
  flag,
  setSnackbarOpen,
  setSnackbarMessage,
  walletData,
  orderBookData,
  flag1
}) => {
  // console.log(walletData, priceData);
  const theme = useTheme();

  const navigate = useNavigate();

  //orderbook value
  const [value, setValue] = useState('0');

  const formikRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({ price: 0, quantity: 0, totalamount: 0, stoplimitprice: 0 });

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //slider
  const valuetext = (value) => `${value}`;

  //dialogbox
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  var formikInit = {};
  if (selectedOrder != undefined && selectedOrder.platformId == pairData.id) {
    formikInit = {
      price: selectedOrder ? selectedOrder.price : priceData?.lastPrice,
      stoplimitprice: '',
      quantity: selectedOrder ? selectedOrder.quantity : '',
      totalamount: selectedOrder ? selectedOrder.price * selectedOrder.quantity : '',
      submit: null
    };
  }
  else {
    formikInit = {
      price: priceData?.lastPrice,
      stoplimitprice: '',
      quantity: '',
      totalamount: '',
      submit: null
    };
  }

  const handleOpenDialog = () => {
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
      if (parts[1] && parts[1].length > pairData?.priceFloat) {
        parts[1] = parts[1].substring(0, pairData?.priceFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * (values?.quantity)).toFixed(pairData?.priceFloat).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('price', numericValue);
      setFieldValue('totalamount', secondValue);
    }

    // Handle 'quantity' and 'totalamount'
    if (e.target.name === 'quantity') {
      // console.log('added', parseFloat(numericValue), values);
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairData?.quantityFloat) {
        parts[1] = parts[1].substring(0, pairData?.quantityFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * parseFloat(values?.price)).toFixed(pairData?.amountFloat).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('quantity', numericValue);
      setFieldValue('totalamount', secondValue);
    }

    if (e.target.name === 'totalamount') {
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairData?.amountFloat) {
        parts[1] = parts[1].substring(0, pairData?.amountFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue / parseFloat(values?.price)).toFixed(pairData?.quantityFloat).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
      setFieldValue('totalamount', numericValue);
      setFieldValue('quantity', secondValue);
    }
  };

  const handleConfirm = () => {
    setIsLoading(true);
    let postData = {
      platformId: priceData?.platformId,
      orderType: 'limit',
      side: flag === 'BUY' ? 1 : 2,
      price: inputs.price,
      quantity: inputs.quantity,
      amount: inputs.totalamount
    };
    if (inputs.stoplimitprice) {
      postData = { ...postData, sPrice: inputs.stoplimitprice, orderType: 'stop' };
    }
    postDataSPOT(Spot_PostOrder_URL(), postData).then(function (res) {
      handleCloseDialog();
      if (res.error !== 'ok') {
        setIsLoading(false);
        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            // setSnackbarMessage({ msg: 'Order Created successfully', success: false });
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        // Set timeout for future usecase
        // setSnackbarMessage({ msg: 'Refresh Now', success: false });
        // setSnackbarOpen(true);

        // Logic moved to sock update
      }
    }, function (err) {
      setSnackbarMessage({ msg: err, success: false });
      setSnackbarOpen(true);
      // Logout User
    });

    //   if (res.error === 'ok') {
    //     setIsLoading(false);
    //     setSnackbarMessage({ msg: 'Order placed successfully', success: false });
    //     setSnackbarOpen(true);
    //   } else {
    //     setIsLoading(false);
    //     setSnackbarMessage({ msg: res.error, success: false });
    //     setSnackbarOpen(true);
    //   }
    // }, function (err) {
    //   setIsLoading(false);
    //   setSnackbarMessage({ msg: e, success: false });
    //   setSnackbarOpen(true);
    //   console.log(e);
    // });
  };

  useEffect(() => {
    let SPOTOrderEvt = '/SPOTOrder_' + getConfig_sp().userId + '/POST';
    socket.on(SPOTOrderEvt, function (res) {

      setIsLoading(false);
      // console.log(res, 'Response from Sock');

      if (parseInt(res.platformId) === parseInt(priceData?.platformId)) {
        if ((res.action == 'postSuccess' || res.action == 'matchSuccess' || res.action == 'stopOrder') && res.userId == getConfig_sp().userId) {
          handleCloseDialog();
          setSelectedOrder(undefined); // Reset Selected Order
          setInputs({ price: 0, quantity: 0, totalamount: 0, stoplimitprice: 0 });

          // Unused logic - For reference
          // formikRef.current.resetForm({values : {
          //   price: priceData?.lastPrice,
          //   stoplimitprice: '',
          //   quantity: '',
          //   totalamount: '',
          //   submit: null
          // }});

          mutate(Spot_PreTrade_URL);
          setSnackbarMessage({ msg: res.message, success: false });
          setSnackbarOpen(true);
        }
        else if (res.action == 'postError' || res.action == 'cancelError' && res.userId == getConfig_sp().userId) {
          mutate(Spot_PreTrade_URL);
          setSnackbarMessage({ msg: res.message, success: false });
          setSnackbarOpen(true);
        }
        // else if(res.action == 'cancelSuccess' && res.userId == getConfig_sp().userId) {
        //   mutate(Spot_PreTrade_URL);
        //   setSnackbarMessage({ msg: res.message, success: false });
        //   setSnackbarOpen(true);
        // }
      }
    });

    return () => {
      socket.off(SPOTOrderEvt);
    };

  }, []);

  const BuyTds = (parseFloat(inputs.totalamount) + (parseFloat(inputs.totalamount) * 0.012)).toFixed(pairData?.amountFloat);

  const SellTds = (parseFloat(inputs.totalamount) - (parseFloat(inputs.totalamount) * 0.012)).toFixed(pairData?.amountFloat);

  return (
    < >
      <Formik
        innerRef={formikRef}
        initialValues={formikInit}
        validationSchema={Yup.object().shape({
          ...(flag1 === 'STOPLIMIT' && {
            stoplimitprice: Yup.number().positive("Enter a positive number").required("Don't leave empty*"),
          }),
          price: Yup.number().typeError("Enter a valid number").positive("Enter a positive number").required("Don't leave empty*"),
          quantity: Yup.number().typeError("Enter a valid number").positive("Enter a positive number").required("Don't leave empty*").test(
            'insufficient-balance',
            'Insufficient balance',
            function (value) {
              if (flag === 'SELL') {
                const availableBalance = walletData.buyPair;
                return parseFloat(value) <= availableBalance;
              }
              return true;
            }
          ),
          totalamount: Yup.number().typeError("Enter a valid number").positive("Enter a positive number").required("Don't leave empty*")
            .test(
              'insufficient-balance',
              'Insufficient balance',
              function (value) {
                if (flag === 'BUY') {
                  const availableBalance = walletData?.sellPair;
                  return parseFloat(value) <= availableBalance;
                }
                return true;
              }
            )
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log({ values });
          handleOpenDialog();
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1.5}>
              {flag1 === 'STOPLIMIT' &&
                <Grid item xs={12} pb={0}>
                  <Stack spacing={1} pt={0} pb={0}>
                    <OutlinedInput
                      id="stoplimitprice"
                      type="stoplimitprice"
                      value={values.stoplimitprice}
                      name="stoplimitprice"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        let numericValue = e.target.value.replace(/[^0-9.]/g, '');
                        const decimalCount = (numericValue.match(/\./g) || []).length;
                        if (decimalCount > 1) {
                          numericValue = numericValue.replace(/\./g, (_, i) => (i === numericValue.lastIndexOf('.') ? '.' : ''));
                        }
                        const parts = numericValue.split('.');
                        if (parts[1] && parts[1].length > pairData?.priceFloat) {
                          parts[1] = parts[1].substring(0, pairData?.priceFloat);
                          numericValue = parts.join('.');
                        }
                        handleChange({ target: { name: 'stoplimitprice', value: numericValue } });
                      }}
                      placeholder="stop limit"
                      fullWidth
                      error={Boolean(touched.stoplimitprice && errors.stoplimitprice)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {priceData?.sellPair}
                          </Typography>
                          {/* <Stack spacing={1} direction="row">
                            <ButtonBase
                              onClick={() => {
                                // Increase the value by 0.1
                                var numericValue = parseFloat(values.stoplimitprice || 0);
                                const updatedValue = (numericValue + 0.0001).toFixed(pairData?.priceFloat);
                                handleChange({ target: { name: 'stoplimitprice', value: updatedValue } });
                              }}
                            >
                              <AddIcon fontSize="34px" />
                            </ButtonBase>
                            <ButtonBase
                              onClick={() => {
                                // decrease the value by 0.1
                                var numericValue = parseFloat(values.stoplimitprice || 0);
                                const updatedValue = (numericValue - 0.0001).toFixed(pairData?.priceFloat);
                                handleChange({ target: { name: 'stoplimitprice', value: updatedValue } });
                              }}
                            >
                              <RemoveIcon fontSize="34px" />
                            </ButtonBase>
                          </Stack> */}
                        </InputAdornment>
                      }
                    />
                    {touched.stoplimitprice && errors.stoplimitprice && (
                      <FormHelperText error id="standard-weight-helper-text-price">
                        {errors.stoplimitprice}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              }
              <Grid item xs={12} pt={0}>
                <Stack spacing={1} pt={0}>
                  <OutlinedInput
                    id="price"
                    type="price"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder='Price'
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          {priceData?.sellPair}
                        </Typography>
                        {/* <Stack spacing={1} direction="row">
                          <ButtonBase onClick={() => {
                            // Increase the value by 0.1
                            var numericValue = parseFloat(values.price || 0);
                            const updatedValue = (numericValue + 0.0001).toFixed(pairData?.priceFloat);
                            handleChange({ target: { name: 'price', value: updatedValue } });
                            const secondValue = isNaN(numericValue) ? '' : (updatedValue * parseFloat(values?.quantity)).toFixed(pairData?.amountFloat).replace(/(\.0*|0+)$/, '');
                            handleChange({ target: { name: 'totalamount', value: secondValue } });
                          }}>
                            <AddIcon fontSize="34px" />
                          </ButtonBase>
                          <ButtonBase onClick={() => {
                            // Decrease the value by 0.1
                            const numericValue = parseFloat(values.price || 0);
                            const updatedValue = (numericValue - 0.0001).toFixed(pairData?.priceFloat);
                            handleChange({ target: { name: 'price', value: updatedValue } });
                            const secondValue = isNaN(numericValue) ? '' : (updatedValue * parseFloat(values?.quantity)).toFixed(pairData?.amountFloat).replace(/(\.0*|0+)$/, '');
                            handleChange({ target: { name: 'totalamount', value: secondValue } });
                          }}>
                            <RemoveIcon fontSize="34px" />
                          </ButtonBase>
                        </Stack> */}
                      </InputAdornment>
                    }
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1} pt={1.2}>
                  <OutlinedInput
                    id="quantity"
                    type="quantity"
                    value={values.quantity}
                    name="quantity"
                    onBlur={handleBlur}
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder="Quantity"
                    fullWidth
                    error={Boolean(touched.quantity && errors.quantity)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          {priceData?.buyPair}
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
                <Stack pt={1.2} pl={1} pr={1}>
                  <CustomSlider
                    aria-label="Temperature"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    valueLabelFormat={(value) => `${parseFloat(value.toFixed(1))}%`}
                    valueLabelDisplay="auto"
                    step={25}
                    marks
                    min={0}
                    max={100}
                    flag={flag === 'BUY' ? true : false}
                    // value={
                    //   flag === 'BUY'
                    //     ? ((values.totalamount) / (walletData?.sellPair)) * 100
                    //     : ((values.quantity) / (walletData?.buyPair)) * 100
                    // }
                    value={
                      flag === 'BUY'
                        ? walletData?.sellPair !== 0
                          ? ((values.totalamount) / (walletData?.sellPair)) * 100
                          // : 0
                          : ((values.totalamount) && (values.quantity))
                        : walletData?.buyPair !== 0
                          ? ((values.quantity) / (walletData?.buyPair)) * 100
                          // :0
                          : ((values.totalamount) && (values.quantity))
                    }
                    onChange={(event, newValue) => {
                      var numericValue = flag === 'BUY' ? parseFloat(walletData?.sellPair || 0) : parseFloat(walletData?.buyPair || 0);
                      const updatedValue = (numericValue * (newValue / 100));
                      flag === 'BUY' ? handleChange({ target: { name: 'totalamount', value: updatedValue } }) : handleChange({ target: { name: 'quantity', value: updatedValue } });
                      const secondValue = flag === 'BUY' ? (updatedValue / parseFloat(values?.price)).toFixed(pairData?.quantityFloat).replace(/(\.0*|0+)$/, '') : (updatedValue * parseFloat(values?.price)).toFixed(pairData?.amountFloat).replace(/(\.0*|0+)$/, ''); //.replace(/(\.0*|0+)$/, '')
                      flag === 'BUY' ? handleChange({ target: { name: 'quantity', value: secondValue } }) : handleChange({ target: { name: 'totalamount', value: secondValue } });
                    }}
                  />
                </Stack>
                <Stack pt={0} direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="subtitle1" pl={1}>
                    0%
                  </Typography>
                  <Typography variant="subtitle1">25%</Typography>
                  <Typography variant="subtitle1">50%</Typography>
                  <Typography variant="subtitle1">75%</Typography>
                  <Typography variant="subtitle1">100%</Typography>
                </Stack>

                <Stack spacing={1} pt={1.4}>
                  <OutlinedInput
                    id="totalamount"
                    type="totalamount"
                    value={values.totalamount}
                    name="totalamount"
                    onBlur={handleBlur}
                    onChange={(e) => handleCustomChange(e, setFieldValue, values)}
                    placeholder="Total Amount"
                    fullWidth
                    error={Boolean(touched.totalamount && errors.totalamount)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          {priceData?.sellPair}
                        </Typography>
                      </InputAdornment>
                    }
                  />
                  {touched.totalamount && errors.totalamount && (
                    <FormHelperText error id="standard-weight-helper-text-totalamount">
                      {errors.totalamount}
                    </FormHelperText>
                  )}
                </Stack>

                <Grid pl={.5} pr={.5}>
                  <Stack pt={1.2} direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Avbl
                    </Typography>
                    {isAuthorised ? (
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                      >
                        {flag === 'BUY' ? walletData?.sellPair : walletData?.buyPair}{' '}
                        {flag === 'BUY' ? priceData?.sellPair : priceData?.buyPair}
                      </Typography>
                    ) : (
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                      >
                        --- {flag === 'BUY' ? priceData?.sellPair : priceData?.buyPair}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {isAuthorised ? (
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                    variant={flag === 'BUY' ? 'spotbuybutton' : 'spotsellbutton'}
                  >
                    {flag === 'BUY' ? `Buy ${priceData?.buyPair}` : `Sell ${priceData?.buyPair}`}
                  </Button>
                ) : (
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    variant={flag === 'BUY' ? 'spotbuybutton' : 'spotsellbutton'}
                    onClick={() => navigate('/login')}
                  >
                    LOGIN
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
        <Stack p={4} spacing={2.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="title1" sx={{ color: flag === 'BUY' ? 'text.buy' : 'text.sell' }}  >
              {flag === 'BUY' ? 'Buy' : 'Sell'}  {priceData?.buyPair}
            </Typography>

            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {inputs.stoplimitprice ? 'Stop Order' : 'Limit Order'}
            </Typography>
          </Stack>
          <Divider></Divider>
          <Dialogboxvalue title="Price" value={inputs.price} pair={priceData?.sellPair} />
          <Dialogboxvalue title="Quantity" value={inputs.quantity} pair={priceData?.buyPair} />
          <Dialogboxvalue title="Total Amount" value={inputs.totalamount} pair={priceData?.sellPair} />
          <Divider></Divider>
          <Dialogboxvalue title=" After Fess and TDS" value={flag === 'BUY' ? BuyTds : SellTds} pair={priceData?.sellPair} />
          <Divider></Divider>
          <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained5" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant={flag === 'BUY' ? 'contained4' : 'contained4'} onClick={handleConfirm}>
              {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
            </Button>
          </Stack>
          <Stack>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
            >
              Fees : Maker 0.2% | Taker 0.2% | TDS 1.0%
              <br />
              (Incl. Charges)
            </Typography>
          </Stack>
        </Stack>
      </Dialog>
    </ >
  );
};

export default BuySelloder;
