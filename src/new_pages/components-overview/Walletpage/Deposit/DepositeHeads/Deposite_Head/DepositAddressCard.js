import React, { useState } from 'react';

import {
  Grid, Card, useTheme, Stack, Typography, Divider, InputAdornment,
  OutlinedInput, Tooltip, IconButton
} from '@mui/material';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoneIcon from '@mui/icons-material/Done';

import CopyToClipboard from 'react-copy-to-clipboard';

import QrCode from '../../../../../../assets/images/gravitusimage/qrcode.svg';
import Copyicon from '../../../../../../assets/images/gravitusimage/copyicon.svg';

const DepositAddressCard = ({ depositData }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {depositData ? (
        <>
          <Stack pl={{ xs: 0, sm: 0, md: 5, lg: 5 }}
            display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }
            }}>
            <Card variant="outlined">
              <Stack direction="row" justifyContent="space-around"
                pt={2}
                pb={2}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                }}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Scan the code
                  </Typography>
                  {/* <img src={depositData?.wAddress?.qrCode} alt="qrcode" height={20} width={20} /> */}
                  <img style={{ backgroundColor: 'white' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(depositData?.wAddress?.qrCode)}`} alt="qrcode" />
                </Stack>
                <Grid>
                  <Divider orientation="vertical" sx={{ height: '100%' }}>
                    {/* or */}
                  </Divider>
                </Grid>
                <Stack spacing={1} pr={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Address
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Network: {''}
                      <span style={{ color: '#00BBAB' }}>{depositData?.wListing?.networkType}</span>
                    </Typography>
                  </Stack>

                  <OutlinedInput
                    fullWidth
                    size="small"
                    value={depositData?.wAddress?.address}
                    readOnly
                    multiline
                    rows={3}
                    sx={{
                      color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
                      '& textarea': {
                        scrollbarWidth: 'none',
                        '-ms-overflow-style': 'none',
                        '&::-webkit-scrollbar': {
                          width: '0.4em',
                          height: '0.4em'
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: 'transparent'
                        }
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <CopyToClipboard text={depositData?.wAddress?.address} onCopy={handleCopy}>
                          <Tooltip placement="top" disableFocusListener title={copied ? 'Copied' : 'Click to copy'} arrow>
                            <IconButton disableRipple>
                              {copied ? <DoneIcon color="#C1C1C1" /> : <img src={Copyicon} alt="copy" style={{ cursor: 'pointer' }} />}
                            </IconButton>
                          </Tooltip>
                        </CopyToClipboard>
                      </InputAdornment>
                    }
                  />
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack pl={{ xs: 0, sm: 0, md: 5, lg: 5 }}
            display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }
            }}>

            <Stack justifyContent="space-around"
              pb={2}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
              }}>
              <Stack spacing={0.5} alignItems="center" pb={2}>
                <img style={{ backgroundColor: 'white', width: '220px' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(depositData?.wAddress?.qrCode)}`} alt="qrcode" />
              </Stack>

              <Card variant='outlined' sx={{ backgroundColor: 'transparent', borderRadius: '5px' }} >
                <Grid p={2} xs={12}>
                  <Stack spacing={1} direction='row' justifyContent='space-between'>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Network
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                      {depositData?.wListing?.networkType}
                    </Typography>
                  </Stack>
                  <Stack pt={1} pb={1}>
                    <Divider></Divider>
                  </Stack>
                  <Stack spacing={1} >
                    <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Deposit Address
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems='center'>
                      <Stack width='100%'>
                        <OutlinedInput
                          fullWidth
                          size="large"
                          value={depositData?.wAddress?.address}
                          readOnly
                          multiline
                          rows={1}
                          sx={{
                            color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <CopyToClipboard text={depositData?.wAddress?.address} onCopy={handleCopy}>
                                <Tooltip placement="top" disableFocusListener title={copied ? 'Copied' : 'Click to copy'} arrow>
                                  <IconButton disableRipple>
                                    {copied ? <DoneIcon color="#C1C1C1" /> : <img src={Copyicon} alt="copy" style={{ cursor: 'pointer' }} />}
                                  </IconButton>
                                </Tooltip>
                              </CopyToClipboard>
                            </InputAdornment>
                          }
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Card>
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <Stack pl={{ xs: 0, sm: 0, md: 5, lg: 5 }} sx={{
            width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }
          }} justifyContent="center">
            <Card variant="outlined" justifyContent="space-around" alignItems="center">
              <Stack
                pl={1}
                pt={2}
                pb={2}
                spacing={1}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground', }}
              >
                <TaskAltIcon sx={{ fontSize: '32px' }} />
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Select the coin and then see a specified deposit address.
                </Typography>
              </Stack>
            </Card>
          </Stack>
        </>
      )}
    </>
  );
};

export default DepositAddressCard;
