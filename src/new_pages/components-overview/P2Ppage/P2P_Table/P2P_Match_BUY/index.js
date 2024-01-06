
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  Divider,
  Collapse,
  Pagination,
  Card,
  Drawer
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import HIW_Buy from '../_HIW_Buy';

import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';
import FormField from './FormField';

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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleCancelClick = () => {
    setOpen(false);
    props.onCollapseToggle(false);
  };

  return (
    <React.Fragment>
      {!open && (
        <TableRow
          // hover 
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }} tabIndex={-1} key={index}>
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
          <Collapse in={open} unmountOnExit sx={{
            borderRadius: '10px',
          }}>
            <Card
              variant="outlined"
              sx={{
                borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
              }}
            >
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
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6}>
                    <FormField
                      isAuthorised={isAuthorised}
                      pairInfo={pairInfo}
                      row={row}
                      props={props}
                      handleCancelClick={handleCancelClick}
                      setSnackbarOpen={setSnackbarOpen}
                      setSnackbarMessage={setSnackbarMessage}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Card>
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

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRow, setSelectedrow] = useState();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const DrawerOpen = (row) => {
    setOpenDrawer(!openDrawer);
    setSelectedrow(row)
  }
  return (
    <Box>
      <TableContainer variant="tablecontainer"
        sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}
      >
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

      {/* Mobileview */}
      <Stack sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}>
        {orderBookbuy && filteredOrderbook?.length === 0 ? (
          <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='No Record Found.' />
            </Stack>
          </Grid>
        ) : filteredOrderbook && filteredOrderbook.map((row, index) => (
          <>
            <Card key={index} sx={{ boxShadow: 'none', bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground', }}>
              <Grid item xs={12} >
                <Stack
                  p={1}
                  // pb={1}
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
                </Stack>

                <Stack p={1} spacing={1.5} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Price</Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.price} {pairInfo.sellPair}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}> Quantity</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.quantity} {pairInfo.buyPair}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >Total Amount</Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.amount} {pairInfo.sellPair}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
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

                {isAuthorised ? (
                  <Stack p={1}>
                    <Button variant="spotbuybutton" onClick={() => DrawerOpen(row)}>
                      <Typography variant="body1" color="white" >
                        Buy {pairInfo.buyPair}
                      </Typography>
                    </Button>
                  </Stack>
                ) : (
                  <Stack p={1}>
                    <Button variant="spotbuybutton" component={RouterLink} to="/login">
                      <Typography variant="body1" color="white">
                        Login
                      </Typography>
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Card>
            <Stack pt={1} pb={1}>
              <Divider />
            </Stack>
          </>
        )
        )}
      </Stack>
      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="bottom"
        PaperProps={{
          style: {
            borderRadius: '15px 15px 0px 0px',
            display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' }
          },
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            padding: '16px',
          }}
        >
          <Stack>
            <Stack pb={2} direction='row' spacing={0.5} justifyContent="space-between">
              <Typography
                variant='body1'
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}>
                Buy USDT
              </Typography>
              <CloseIcon fontSize="small" onClick={handleCloseDrawer} sx={{
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
              }} />
            </Stack>
            <FormField
              isAuthorised={isAuthorised}
              orderBookData={orderBookbuy}
              row={selectedRow}
              pairInfo={pairInfo}
              handleCancelClick={handleCloseDrawer}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
            />
          </Stack>
        </Card>
      </Drawer >
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
