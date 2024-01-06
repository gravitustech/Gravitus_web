import React from 'react';
import { Button, Card, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';

const Order_History_mbl = ({ orders, pairInfo }) => {
  const theme = useTheme();

  return (
    < >
      {orders?.history?.length === 0 ? (
        <>
          <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='You have no history' />
            </Stack>
          </Grid>
        </>
      ) : (
        orders?.history?.map((row, index) => {
          console.log('row', row)
          // const isItemSelected = isSelected(row.Name);
          return (
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
                      <Stack pr={1} direction="row" spacing={2} justifyContent="space-between">
                        <Stack spacing={1} direction="row" justifyContent="start"  >
                          <Stack spacing={1} >
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              Type
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <Typography variant="subtitle1" sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                                {row.side}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack spacing={1} textAlign='end' justifyContent='end'>
                          <Stack spacing={1} >
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              Quantity
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {row.quantity} {pairInfo.buyPair}
                            </Typography>
                          </Stack>

                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid xs={6} direction="row" spacing={2}   >
                      <Stack pl={1} direction="row" spacing={2} justifyContent="space-between">
                        <Stack spacing={1} direction="row" justifyContent="start" >
                          <Stack spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              {/* Tds */}
                            </Typography>

                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {/* {row.tds === 0 ? '--' : row.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })} */}
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
                      <Stack pr={1} direction="row" spacing={2} justifyContent="space-between">
                        <Stack spacing={1} direction="row" justifyContent="start"  >
                          <Stack spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              Amount
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {row.price} {pairInfo.sellPair}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Stack spacing={1} textAlign='end' justifyContent='end'>
                          <Stack spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              Total Amount
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {row.amount} {pairInfo.sellPair}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid xs={6} direction="row" spacing={2}>
                      <Stack pl={1} direction="row" spacing={2} justifyContent="space-between">
                        <Stack spacing={1} direction="row" justifyContent="start" >
                          <Stack spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                              Tds
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {row.tds === 0 ? '--' : row.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}
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
                              sx={{
                                color: row.status === 'Matched' ?
                                  theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' :
                                  theme.palette.mode === 'dark' ? 'text.sell' : 'text.sell'
                              }}
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
    </ >
  )
}

export default Order_History_mbl;
