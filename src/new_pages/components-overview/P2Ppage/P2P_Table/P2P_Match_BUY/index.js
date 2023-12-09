import ordersuccessgif from '../../../../../assets/images/gravitusimage/ordersuccesgif.svg';

import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { Formik } from 'formik';
import * as Yup from 'yup';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { getConfig_sp, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Avatar,
  Button,
  useTheme,
  Grid,
  FormHelperText,
  OutlinedInput,
  Divider,
  InputAdornment,
  Collapse,
  Pagination,
  Dialog,
  CircularProgress
} from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import HIW_Buy from '../_HIW_Buy';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/Norecordfoundcomponents';
import Importantnotescomponents from '../../../Walletpage/Deposit/DepositeHeads/Depositehead1/Importantnotescomponents';

import { P2P_MatchTrade_URL, postDataP2P } from 'src/api_ng/peer2peer_ng';
import { socket } from '../../../../../socket';
import DialogBoxValue from 'src/new_pages/components-overview/Spotpage/BuySellGrid/Dialog_Box_Val';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Advertiser',
    align: 'left',
    disablePadding: true,
    label: 'Advertiser'
  },
  {
    id: 'Price',
    align: 'left',
    disablePadding: true,
    label: 'Price'
  },
  {
    id: 'Quantity',
    align: 'left',
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'Total Amount',
    align: 'left',
    disablePadding: true,
    label: 'Total Amount'
  },
  {
    id: 'Payment Options',
    align: 'left',
    disablePadding: false,
    label: 'Payment Options'
  },
  {
    id: 'Trade',
    align: 'right',
    disablePadding: false,
    label: 'Trade'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableBody(props) {
  const { isAuthorised, row, pairInfo, setSnackbarOpen, setSnackbarMessage, index } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const formikMatchBuy = useRef();

  const handleCancelClick = () => {
    setOpen(false);
    props.onCollapseToggle(false);
  };

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

        formikMatchBuy.current.resetForm({values : { 
          quantity: '', 
          totalamount: ''
        }});

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
    <React.Fragment>
      {!open && (
        <TableRow
          // hover 
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
          <TableCell sx={{ border: 'none' }} component="th" scope="row" align="left">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
            >
              <Avatar
                alt=''
                src=''
                sx={{
                  width: 20,
                  height: 20,
                  fontSize: 16
                }}
              />
              <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                {row.userId}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell sx={{ border: 'none' }} align="left">
            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {row.price} {pairInfo.sellPair}
            </Typography>
          </TableCell>

          <TableCell sx={{ border: 'none' }} align="left">
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {row.quantity} {pairInfo.buyPair}
            </Typography>
          </TableCell>

          <TableCell sx={{ border: 'none' }} align="left">
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {row.amount} {pairInfo.sellPair}
            </Typography>
          </TableCell>

          <TableCell sx={{ border: 'none' }} align="left">
            <Stack direction="row" spacing={1}>
              {row.payModes
                .filter(paymentMode => paymentMode.mode === 'UPI' || paymentMode.mode === 'IMPS')
                .map((paymentMode, index) => (
                  <Typography key={index} variant="body1" color='text.buy'>
                    {paymentMode.mode}
                  </Typography>
                ))}
            </Stack>
          </TableCell>

          <TableCell sx={{ border: 'none' }} align="right">
            {isAuthorised ? (<Button variant="p2pbuybutton" onClick={() => setOpen(!open, row)}>
              <Typography variant="body1" color="white">
                Buy {pairInfo.buyPair}
              </Typography>
            </Button>) : (<Button variant="p2pbuybutton" component={RouterLink} to="/login">
              <Typography variant="body1" color="white">
                Login
              </Typography>
            </Button>)}

          </TableCell>
        </TableRow>
      )}

      <TableRow sx={{ border: 'none' }}>
        <TableCell style={{ border: 'none' }} colSpan={6}>
          <Collapse in={open} unmountOnExit sx={{ boxShadow: ' 0.5px 2px 50px 0.5px rgba(0, 0, 0, 0.07)' }}>
            <Stack direction="row" pt={3} pb={3} pl={8} pr={8}>
              <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        alt=''
                        src=''
                        sx={{
                          width: 39,
                          height: 39,
                          fontSize: 20
                        }}
                      />
                      <Stack>
                        <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.userId}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          <Typography pt={0.2} variant="subtitle2" >
                            0 Trades
                          </Typography>
                          <Typography>|</Typography>
                          <Typography pt={0.2} variant="subtitle2">
                            100%
                          </Typography>
                          <Typography pt={0.2} variant="subtitle2">
                            Completion
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack pr={12}>
                      <Typography textAlign='end' variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        60 Minutes
                      </Typography>
                      <Typography pr={.1} textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Duration
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack pt={2} pl={5.6} pr={12} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    <Stack pt={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Price</Typography>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.price} {pairInfo.sellPair}
                      </Typography>
                    </Stack>

                    <Stack pt={3} direction="row" justifyContent="space-between">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}> Quantity</Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.quantity} {pairInfo.buyPair}
                      </Typography>
                    </Stack>

                    <Stack pt={3} direction="row" justifyContent="space-between">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >Total Amount</Typography>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {pairInfo.sellPair}
                      </Typography>
                    </Stack>

                    <Stack pt={3} direction="row" justifyContent="space-between">
                      <Typography variant="body1">Payment Options</Typography>
                      <Stack direction="row" spacing={1}>
                        {row.payModes
                          .filter(paymentMode => paymentMode.mode === 'UPI' || paymentMode.mode === 'IMPS')
                          .map((paymentMode, index) => (
                            <Typography key={index} variant="body1" color='text.buy'>
                              {paymentMode.mode}
                            </Typography>
                          ))}
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* <Stack pt={3} pl={5.6} pr={12} spacing={2.5}>
                    <Importantnotescomponents
                      img={Noteicon}
                      description={'Lorem ipsum dolor sit amet consectetur. Lorem ipsum.'}
                    />
                    <Importantnotescomponents img={Noteicon} description={'Lorem ipsum dolor sit amet consectetur.'} />
                  </Stack> */}
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Stack pl={2} pr={2}>
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
                                <Grid  >
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
                              <Stack direction="row" spacing={3} pt={3}>
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
                      <Stack p={4} spacing={2.5} >
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
                </Grid>
              </Grid>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

OrderTableBody.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function P2pbuyordertab({ isAuthorised, pairInfo, orderBook, priceSearchQuery, quantitySearchQuery, useridSearchQuery, setSnackbarOpen, setSnackbarMessage }) {
  const theme = useTheme();
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const orderBookbuy = orderBook?.BUY

  const p2pBuyFilter = orderBookbuy?.filter((row) => {
    return (
      (!priceSearchQuery || row.price.toString().includes(priceSearchQuery)) &&
      (!quantitySearchQuery || row.quantity.toString().includes(quantitySearchQuery)) &&
      (!useridSearchQuery || row.userId.toString().includes(useridSearchQuery))
    );
  });

  const orderbookpagenation = rowsPerPage > 0
    ? p2pBuyFilter && p2pBuyFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : p2pBuyFilter;

  const filteredOrderbook = orderbookpagenation;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 1));
    setPage(0);
  };

  const handleCollapseToggle = (isOpen) => {
    setOpenCollapse(isOpen);
  };

  const handleChangePage = (event, value) => {
    setPage(value - 1);

    // For use case
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "auto",
    //   });
    // };

    if (typeof window !== 'undefined') {
      const scrollToTop = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
          window.scrollBy(0, -30); // Adjust the scroll speed by changing the second parameter
          requestAnimationFrame(scrollToTop);
        }
      };

      scrollToTop();
    }
  };

  return (
    <Box>
      <TableContainer variant="tablecontainer">
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:nth-child(2)': {
              pl: 6
            },
            '& .MuiTableCell-root:nth-child(3)': {
              pl: 6
            },
            '& .MuiTableCell-root:nth-child(4)': {
              pl: 6
            },
            '& .MuiTableCell-root:nth-child(5)': {
              pl: 6
            },
          }}
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell, index) => (
                <TableCell
                  sx={{ border: 'none' }}
                  key={index}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                >
                  <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {headCell.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {orderBookbuy && filteredOrderbook?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : filteredOrderbook && filteredOrderbook.map((item, index) => (
              <OrderTableBody
                isAuthorised={isAuthorised}
                orderBookData={orderBookbuy}
                row={item}
                key={index}
                pairInfo={pairInfo}
                open={openCollapse}
                onCollapseToggle={handleCollapseToggle}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box pt={2} display="flex" justifyContent="center">
        {orderBookbuy && filteredOrderbook?.length === 0 ? (
          <>
          </>
        ) : (
          <Pagination
            count={Math.ceil(p2pBuyFilter?.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: 'text.buy',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'text.buy'
                }
              }
            }}
          />
        )}
      </Box>
      <HIW_Buy />
    </Box>
  );
}
