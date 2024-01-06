import { Button, Card, Checkbox, CircularProgress, Dialog, Divider, FormControlLabel, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';
import warninggif from '../../../../../assets/images/gravitusimage/warninggif.svg';
import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
const HistoryTab_mblview = ({ isAuthorised, orderTableData,
  priceData }) => {
  const theme = useTheme();

  const [hideCancelled, setHideCancelled] = React.useState(false);
  const cancelhandleChange = (event) => {
    setHideCancelled(event.target.checked);
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={hideCancelled}
            onChange={cancelhandleChange}
            name="checked"
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Hide Cancelled Orders
          </Typography>
        }
      />
      {isAuthorised ? (
        <>
          {orderTableData?.history?.length === 0 ? (
            <>
              <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                  <Norecordfoundcomponents
                    description='You have no order histroy.' />
                </Stack>
              </Grid>
            </>
          ) : (
            orderTableData?.history.map((row, index) => {
              // const isItemSelected = isSelected(row.Name);
              const shouldRenderRow = !hideCancelled || (hideCancelled && row.status !== 'Cancelled');
              return shouldRenderRow && (
                <>
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                      boxShadow: 'none',
                    }}>
                    <Stack spacing={1} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                      <Stack p={0.5} direction="row" spacing={2} justifyContent="space-between">

                        <Grid xs={6} direction="row" spacing={2}  >
                          <Stack pr={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start"  >
                              <Stack spacing={1} >
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Type
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <Typography variant="subtitle1" sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                                    {row.side}
                                  </Typography>
                                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                    / {row.orderType}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Price
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.price}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                        <Grid xs={6} direction="row" spacing={2}   >
                          <Stack pl={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start" >
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Avg Price
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.aPrice}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Date
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {new Date(Number(row.time)).toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                      </Stack>

                      <Stack p={0.5} direction="row" spacing={2} justifyContent="space-between">

                        <Grid xs={6} direction="row" spacing={2}  >
                          <Stack pr={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start"  >
                              <Stack spacing={1} >
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Quantity
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.quantity}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Amount
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.amount}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                        <Grid xs={6} direction="row" spacing={2}>
                          <Stack pl={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start" >
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  After Chrgs
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.afterChrgs}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Status
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: row.status === 'Cancelled' ? 'text.sell' : 'text.buy' }}
                                >
                                  {row.status}
                                </Typography>

                              </Stack>

                            </Stack>
                          </Stack>
                        </Grid>
                      </Stack>
                    </Stack>
                  </Card>
                  <Stack pt={1} pb={1}>
                    <Divider></Divider>
                  </Stack>

                </>
              )
            })
          )}

        </>
      ) : (
        <>
          <Grid p={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Link color="text.buy" variant="title2" component={RouterLink} to="/login">
                login
              </Link>
              <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                or
              </Typography>
              <Link color="text.buy" variant="title2" component={RouterLink} to="/register">
                Register
              </Link>
              <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Now to Trade
              </Typography>
            </Stack>
          </Grid>
        </>
      )}
    </>
  )
}

export default HistoryTab_mblview
