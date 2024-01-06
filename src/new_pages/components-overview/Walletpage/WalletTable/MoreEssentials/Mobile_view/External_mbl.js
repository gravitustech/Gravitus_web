import React from 'react'
import { Button, Card, CircularProgress, Dialog, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from '../../../_Essentials/NoRecordFound';

const External_mbl = ({ externalData }) => {
  const theme = useTheme();
  return (
    <>
      {externalData?.length === 0 ? (
        <>
          <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='No Record Found.' />
            </Stack>
          </Grid>
        </>
      ) : (
        externalData?.map((row, index) => {
          // const isItemSelected = isSelected(row.Name);
          return (
            <>
              <Card
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                  boxShadow: 'none',
                }}>
                <Stack spacing={2} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                  <Stack direction="row" justifyContent="space-between"  >
                    <Stack spacing={1} textAlign='start' justifyContent='start'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Type
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.transType}
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
                        Amount
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {row.crypto}
                      </Typography>
                    </Stack>

                    <Stack spacing={1} textAlign='end' justifyContent='end'>
                      <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Status
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.status}
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

    </>
  )
}

export default External_mbl;
