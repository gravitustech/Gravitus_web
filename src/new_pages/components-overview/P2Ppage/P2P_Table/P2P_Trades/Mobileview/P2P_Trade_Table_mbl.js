import React from 'react'
import { Card, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';

const P2P_Trade_Table_mbl = ({ orderInfo }) => {
  const theme = useTheme();
  return (
    < >
      {orderInfo?.length === 0 ? (
        <>
          <Grid p={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='No Record Found.' />
            </Stack>
          </Grid>
        </>
      ) : (
        orderInfo?.map((row, index) => {
          return (
            <>
              <Card
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                  boxShadow: 'none',
                }}>
                <Stack spacing={2} pl={1.5} pr={1.5} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                  <Stack direction="row" justifyContent="space-between"  >
                    <Stack spacing={1} textAlign='start' justifyContent='start'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Price
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.price} INR
                      </Typography>
                    </Stack>

                    <Stack spacing={1} textAlign='end' justifyContent='end'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Date
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.timeStamp && !isNaN(Number(row.timeStamp)) ? (
                          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            {new Date(Number(row.timeStamp)).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </Typography>
                        ) : (
                          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            --
                          </Typography>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" >
                    <Stack spacing={1} textAlign='start' justifyContent='start'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Quantity
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.quantity} USDT
                      </Typography>
                    </Stack>

                    <Stack spacing={1} textAlign='end' justifyContent='end'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Total Amount
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} INR
                      </Typography>
                    </Stack>
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

export default P2P_Trade_Table_mbl;
