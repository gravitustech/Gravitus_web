import React, { useState } from 'react';
import { TabContext } from '@mui/lab';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  useTheme,
  Stack,
  Grid,
  Button,
  FormHelperText,
  OutlinedInput,
  Typography,
  ButtonBase,
  Divider,
  CircularProgress
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import NumberFormat from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router';
import { postOrder } from '../../../../api/spot';
import Dialogboxvalue from './Dialogboxvalue';
import BuySelloder from './BuySellorder';
let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

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

const BuyLimitSellLimit = ({
  isAuthorised,
  priceData,
  pairData,
  selectedOrder,
  flag,
  setSnackbarOpen,
  setSnackbarMessage,
  walletData,
  orderBookData
}) => {
  // console.log(walletData, priceData);

  const theme = useTheme();
  const navigate = useNavigate();
  //orderbook value
  const [value, setValue] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    price: 0,
    quantity: 0,
    totalamount: 0,
    stoplimitprice: 0
  });
  console.log(priceData, selectedOrder);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //slider
  const valuetext = (value) => `${value}`;

  //dialogbox
  const [open, setOpen] = React.useState(false);

  const handleCancelClick = () => {
    setOpen(false);
    props.onCollapseToggle(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

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

    // Handle 'quantity' and 'totalamount'
    if (e.target.name === 'quantity') {
      // console.log('added', parseFloat(numericValue), values);
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > pairData?.quantityFloat) {
        parts[1] = parts[1].substring(0, pairData?.quantityFloat);
        numericValue = parts.join('.');
      }
      const firstValue = parseFloat(numericValue);
      const secondValue = isNaN(firstValue) ? '' : (firstValue * parseFloat(values?.price)).toFixed(3);
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
      const secondValue = isNaN(firstValue) ? '' : (firstValue / parseFloat(values?.price)).toFixed(3);
      setFieldValue('totalamount', numericValue);
      setFieldValue('quantity', secondValue);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    let postData = {
      platformId: priceData.platformId,
      orderType: 'limit',
      side: flag === 'BUY' ? 1 : 2,
      price: inputs.price,
      quantity: inputs.quantity,
      amount: inputs.totalamount
    };
    if (inputs.stoplimitprice) {
      postData = { ...postData, sPrice: inputs.stoplimitprice, orderType: 'stop' };
    }
    try {
      const { data } = await postOrder({ accountType: 'GRAVITUS', postData });
      console.log({ data });
      if (data.error === 'ok') {
        setIsLoading(false);
        setSnackbarMessage({ msg: 'Order placed successfully', success: false });
        setSnackbarOpen(true);
        handleCloseDialog();
      } else {
        setIsLoading(false);

        setSnackbarMessage({ msg: data.error, success: false });
        setSnackbarOpen(true);
      }
    } catch (e) {
      setIsLoading(false);
      setSnackbarMessage({ msg: e, success: false });
      setSnackbarOpen(true);
      // console.log(e);
    }
  };
  console.log('pairData?.priceFloat', pairData?.priceFloat)
  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} indicatorColor="none" textColor="inherit">
        <Tab
          disableRipple
          sx={{
            paddingLeft: '0px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '0' ? '12px' : '12px',
            fontWeight: value === '0' ? '500' : '400',
            color:
              value === '0'
                ? theme.palette.mode === 'dark'
                  ? 'text.secondarydark'
                  : 'text.secondary'
                : theme.palette.mode === 'dark'
                  ? 'text.primarydark'
                  : 'text.primary',
            '&:hover': {
              color:
                value === '0'
                  ? theme.palette.mode === 'dark'
                    ? 'text.white'
                    : 'text.black'
                  : theme.palette.mode === 'dark'
                    ? 'text.white'
                    : 'text.black'
            }
          }}
          label={
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Limit
            </div>
          }
          value={'0'}
        />

        <Tab
          disableRipple
          key={'1'}
          sx={{
            paddingLeft: '12px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '1' ? '12px' : '12px',
            fontWeight: value === '1' ? '500' : '400',
            color:
              value === '1'
                ? theme.palette.mode === 'dark'
                  ? 'text.secondarydark'
                  : 'text.secondary'
                : theme.palette.mode === 'dark'
                  ? 'text.primarydark'
                  : 'text.primary',
            '&:hover': {
              color:
                value === '1'
                  ? theme.palette.mode === 'dark'
                    ? 'text.white'
                    : 'text.black'
                  : theme.palette.mode === 'dark'
                    ? 'text.white'
                    : 'text.black'
            }
          }}
          label={
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Stop Limit
            </div>
          }
          value={'1'}
        />
      </TabList>

      <TabPanel value="0" sx={{ padding: '0px' }}>
        <BuySelloder 
          isAuthorised={isAuthorised}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          flag={flag}
          flag1="LIMIT"
        />
        {/* <Formik
          initialValues={{
            price: selectedOrder ? selectedOrder.price : orderBookData.bids[0].price,
            quantity: selectedOrder ? selectedOrder.quantity : '',
            totalamount: selectedOrder ? selectedOrder.price * selectedOrder.quantity : '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            price: Yup.number().positive().required("Don't leave empty*"),
            quantity: Yup.number().positive().required("Don't leave empty*"),
            totalamount: Yup.number().positive().required("Don't leave empty*").test(
              'insufficient-balance',
              'Insufficient balance',
              function (value) {
                const availableBalance = flag === 'BUY' ? walletData.sellPair : walletData.buyPair; // your actual available balance
                return parseFloat(value) <= availableBalance;
              }
            )
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log({ values });
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <OutlinedInput
                    id="price"
                    type="price"
                    value={values.price}
                    name="price"
                    onBlur={handleBlur}
                    onChange={(e, val) => {
                      // Remove all non-numeric and non-decimal point characters
                      let numericValue = e.target.value.replace(/[^0-9.]/g, '');
                      // Ensure there's only one decimal point
                      const decimalCount = (numericValue.match(/\./g) || []).length;
                      if (decimalCount > 1) {
                        // More than one decimal point found, remove the extras
                        numericValue = numericValue.replace(/\./g, (_, i) => (i === numericValue.lastIndexOf('.') ? '.' : ''));
                      }
                      const parts = numericValue.split('.');
                      if (parts[1] && parts[1].length > pairData?.priceFloat) {
                        parts[1] = parts[1].substring(0, pairData?.priceFloat);
                        numericValue = parts.join('.');

                      }
                      handleChange({ target: { name: 'price', value: numericValue } });
                    }}
                    placeholder={orderBookData.bids[0].price}
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Stack spacing={1} direction="row">
                          <ButtonBase onClick={() => {
                            // Increase the value by 0.01
                            const numericValue = parseFloat(values.price || 0);
                            const updatedValue = (numericValue + 0.1).toFixed(2);
                            handleChange({ target: { name: 'price', value: updatedValue } });
                          }}>
                            <AddIcon fontSize="34px" />
                          </ButtonBase>
                          <ButtonBase onClick={() => {
                            // Increase the value by 0.01
                            const numericValue = parseFloat(values.price || 0);
                            const updatedValue = (numericValue - 0.1).toFixed(2);
                            handleChange({ target: { name: 'price', value: updatedValue } });
                          }}>
                            <RemoveIcon fontSize="34px" />
                          </ButtonBase>
                        </Stack>
                      </InputAdornment>
                    }
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.price}
                    </FormHelperText>
                  )}

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
                            {priceData.buyPair}
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
                      valueLabelDisplay="auto"
                      step={25}
                      marks
                      min={0}
                      max={100}
                      flag={flag === 'BUY' ? true : false}
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
                            {priceData.sellPair}
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

                  <Grid pl={0.5} pr={.5}>
                    <Stack pt={1.2} direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Avbl
                      </Typography>
                      {isAuthorised ? (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          {flag === 'BUY' ? walletData.sellPair : walletData.buyPair}{' '}
                          {flag === 'BUY' ? priceData.sellPair : priceData.buyPair}
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          --- {flag === 'BUY' ? priceData.sellPair : priceData.buyPair}
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
                    // onClick={handleClickOpenDialog}
                    >
                      {flag === 'BUY' ? 'BUY' : 'SELL'}
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
        </Formik> */}
      </TabPanel>

      <TabPanel value="1" sx={{ padding: '0px' }}>
      <BuySelloder 
          isAuthorised={isAuthorised}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          flag={flag}
          flag1="STOPLIMIT"
        />
        {/* <Formik
          initialValues={{
            stoplimitprice: '',
            price: selectedOrder ? selectedOrder.price : orderBookData.bids[0].price,
            quantity: selectedOrder ? selectedOrder.quantity : '',
            totalamount: selectedOrder ? selectedOrder.price * selectedOrder.quantity : '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            stoplimitprice: Yup.number().positive().required("Don't leave empty*"),
            price: Yup.number().positive().required("Don't leave empty*"),
            quantity: Yup.number().positive().required("Don't leave empty*"),
            totalamount: Yup.number().positive().required("Don't leave empty*").test(
              'insufficient-balance',
              'Insufficient balance',
              function (value) {
                const availableBalance = flag === 'BUY' ? walletData.sellPair : walletData.buyPair; // Replace with your actual available balance
                return parseFloat(value) <= availableBalance;
              }
            )
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log({ values });
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <OutlinedInput
                    id="stoplimitprice"
                    type="stoplimitprice"
                    value={values.stoplimitprice}
                    name="stoplimitprice"
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    onChange={(e) => {
                      // Remove all non-numeric and non-decimal point characters
                      let numericValue = e.target.value.replace(/[^0-9.]/g, '');

                      // Ensure there's only one decimal point
                      const decimalCount = (numericValue.match(/\./g) || []).length;
                      if (decimalCount > 1) {
                        // More than one decimal point found, remove the extras
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
                        <Stack spacing={1} direction="row">
                          <ButtonBase>
                            <AddIcon fontSize="34px" />
                          </ButtonBase>
                          <ButtonBase>
                            <RemoveIcon fontSize="34px" />
                          </ButtonBase>
                        </Stack>
                      </InputAdornment>
                    }
                  />
                  {touched.stoplimitprice && errors.stoplimitprice && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                      {errors.stoplimitprice}
                    </FormHelperText>
                  )}

                  <Stack spacing={1} pt={1.2}>
                    <OutlinedInput
                      id="price"
                      type="price"
                      value={values.price}
                      name="price"
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
                        handleChange({ target: { name: 'price', value: numericValue } });
                      }}
                      placeholder={orderBookData.bids[0].price}
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                      endAdornment={
                        <InputAdornment position="end">
                          <Stack spacing={1} direction="row">
                            <ButtonBase>
                              <AddIcon fontSize="34px" />
                            </ButtonBase>
                            <ButtonBase>
                              <RemoveIcon fontSize="34px" />
                            </ButtonBase>
                          </Stack>
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
                            {priceData.buyPair}
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
                      valueLabelDisplay="auto"
                      step={25}
                      marks
                      min={0}
                      max={100}
                      flag={flag === 'BUY' ? true : false}
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
                            {priceData.sellPair}
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
                          {flag === 'BUY' ? walletData.sellPair : walletData.buyPair}{' '}
                          {flag === 'BUY' ? priceData.sellPair : priceData.buyPair}
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          --- {flag === 'BUY' ? priceData.sellPair : priceData.buyPair}
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
                    // onClick={handleClickOpenDialog}
                    >
                      {flag === 'BUY' ? 'BUY' : 'SELL'}
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
        </Formik> */}
      </TabPanel>

      {/* {flag === 'BUY' && (
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
          <Stack p={4} spacing={2.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="title1" sx={{ color: 'text.buy' }}>
                Buy {priceData.buyPair}
              </Typography>

              <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {inputs.stoplimitprice ? 'Stop Order' : 'Limit Order'}
              </Typography>
            </Stack>
            <Divider></Divider>
            <Dialogboxvalue title="Price" value={inputs.price} pair={priceData.sellPair} />
            <Dialogboxvalue title="Quantity" value={inputs.quantity} pair={priceData.buyPair} />
            <Dialogboxvalue title="Total Amount" value={inputs.totalamount} pair={priceData.sellPair} />
            <Divider></Divider>
            <Dialogboxvalue title=" After Fess and TDS" value={inputs.totalamount} pair={priceData.sellPair} />
            <Divider></Divider>
            <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
              <Button variant="contained5" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button variant="contained4" onClick={handleConfirm}>
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
      )}
      {flag === 'SELL' && (
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
          <Stack p={4} spacing={2.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="title1" sx={{ color: 'text.sell' }}>
                Sell {priceData.buyPair}
              </Typography>
              <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {inputs.stoplimitprice ? 'Stop Order' : 'Limit Order'}
              </Typography>
            </Stack>
            <Divider></Divider>
            <Dialogboxvalue title="Price" value={inputs.price} pair={priceData.sellPair} />
            <Dialogboxvalue title="Quantity" value={inputs.quantity} pair={priceData.buyPair} />
            <Dialogboxvalue title="Total Amount" value={inputs.totalamount} pair={priceData.sellPair} />
            <Divider></Divider>
            <Dialogboxvalue title=" After Fess and TDS" value={inputs.totalamount} pair={priceData.sellPair} />

            <Divider></Divider>
            <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
              <Button variant="contained5" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button variant="contained4" onClick={handleConfirm}>
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
      )} */}
    </TabContext>
  );
};

export default BuyLimitSellLimit;
