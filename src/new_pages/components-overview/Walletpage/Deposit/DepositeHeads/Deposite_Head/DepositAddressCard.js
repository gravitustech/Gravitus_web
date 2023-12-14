import React, { useState } from 'react';

import { Grid, Card, useTheme, Stack, Typography, Divider, InputAdornment, 
  OutlinedInput, Tooltip, IconButton } from '@mui/material';

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
          <Stack pl={5} sx={{ width: '90%' }}>
            <Card variant="outlined">
              <Stack direction="row" justifyContent="space-around" sx={{ marginBottom: '12px', marginTop: '12px' }}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Scan the code
                  </Typography>
                  {/* <img src={depositData?.wAddress?.qrCode} alt="qrcode" height={20} width={20} /> */}
                  <img style={{ backgroundColor:'white' }} src={`data:image/svg+xml;utf8,${encodeURIComponent(depositData?.wAddress?.qrCode)}`} alt="qrcode" />
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
        </>
      ) : (
        <>
          <Stack pl={5} sx={{ width: '90%' }} justifyContent="center">
            <Card variant="outlined" justifyContent="space-around" alignItems="center">
              <Stack
                spacing={1}
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                sx={{ marginBottom: '16px', marginTop: '16px' }}
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
