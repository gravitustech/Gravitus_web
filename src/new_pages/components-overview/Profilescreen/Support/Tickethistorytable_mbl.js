import React from 'react';
import { Button, Card, CircularProgress, Dialog, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from '../../Walletpage/_Essentials/NoRecordFound';

const Tickethistorytable_mbl = ({ historyData }) => {
  const theme = useTheme();

  return (
    <>
      {historyData?.length === 0 ? (
        <>
          <Grid p={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='No Record Found.' />
            </Stack>
          </Grid>
        </>
      ) : (
        historyData?.map((row, index) => {
          return (
            <>
              <Card
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                  boxShadow: 'none',
                }}>
                <Stack spacing={2} pr={2} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                  <Stack direction="row" justifyContent="space-between"  >
                    <Stack spacing={1} textAlign='start' justifyContent='start'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Type :
                        &nbsp;
                        <span style={{ color: theme.palette.mode === 'dark' ? '#f7f7f7' : '#000', fontWeight: 600 }}>
                          {row.category}
                        </span>
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        Status :
                        &nbsp;
                        <span style={{ color: theme.palette.mode === 'dark' ? '#f7f7f7' : '#000', fontWeight: 600 }}>
                          {row.status === '0' ? 'Opened' : 'Closed'}
                        </span>
                      </Typography>
                    </Stack>

                    <Stack spacing={1} textAlign='end' justifyContent='end'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Date
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" >
                    <Stack spacing={1} textAlign='start' justifyContent='start'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Message :
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.allMessages[0].correspondence}
                      </Typography>
                    </Stack>

                    {/* <Stack spacing={1} textAlign='end' justifyContent='end'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Status
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.status === '0' ? 'opened' : 'closed'}
                      </Typography>
                    </Stack> */}
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
  )
}

export default Tickethistorytable_mbl;
