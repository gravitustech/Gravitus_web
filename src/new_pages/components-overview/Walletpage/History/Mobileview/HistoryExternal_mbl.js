import React, { useState } from 'react';
import { Card, Divider, Drawer, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Norecordfoundcomponents from '../../_Essentials/NoRecordFound';

const HistoryExternal_mbl = ({ tableData }) => {
  const theme = useTheme();
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
    < >
      {tableData?.length === 0 ? (
        <>
          <Grid p={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Norecordfoundcomponents
                description='No Record Found.' />
            </Stack>
          </Grid>
        </>
      ) : (
        tableData?.map((row, index) => {
          return (
            <>
              <Card
                onClick={() => DrawerOpen(row)}
                state={{ walletId: row }}
                key={index}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                  boxShadow: 'none',
                }}>
                <Stack spacing={2} pl={1.5} pr={1.5} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
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
      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="bottom"
        PaperProps={{
          style: {
            borderRadius: '15px 15px 0px 0px',
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
          <Stack p={1}>
            <Stack pb={3} direction='row' spacing={0.5} justifyContent="space-between">
              <Typography
                variant='body1'
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}>
                Transaction Info ({selectedRow?.transType})
                {/* {selectedRow?.transType} Details */}
              </Typography>
              <CloseIcon fontSize="small" onClick={handleCloseDrawer} sx={{
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
              }} />
            </Stack>
            <Stack spacing={2}>
              <Stack spacing={0.5} textAlign='start' justifyContent='start'>
                <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Amount
                </Typography>
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  {selectedRow?.amount} {selectedRow?.crypto}
                </Typography>
              </Stack>

              <Stack spacing={0.5} textAlign='start' justifyContent='start'>
                <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Fees
                </Typography>
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  {selectedRow?.charges} {selectedRow?.crypto}
                </Typography>
              </Stack>

              <Stack spacing={0.5} textAlign='start' justifyContent='start'>
                <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Address
                </Typography>
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  {selectedRow?.address}
                </Typography>
              </Stack>

              <Stack spacing={0.5} textAlign='start' justifyContent='start'>
                <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Transaction Id
                </Typography>
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  <Tooltip title='Click to see the status' arrow placement='top' >
                    <a href={selectedRow?.href} target="_blank" rel="noopener noreferrer">
                      {selectedRow?.txId}
                    </a>
                  </Tooltip>
                </Typography>
              </Stack>

              <Stack spacing={0.5} textAlign='start' justifyContent='start'>
                <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Status
                </Typography>
                <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  {selectedRow?.status}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Drawer >
    </>
  )
}

export default HistoryExternal_mbl;
