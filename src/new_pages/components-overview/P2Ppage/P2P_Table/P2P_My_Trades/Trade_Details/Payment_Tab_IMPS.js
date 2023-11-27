import React, { useState } from 'react';

import {
  Typography,
  Stack,
  useTheme,
  Tooltip,
  IconButton
} from '@mui/material';

import CopyIcon from '../../../../../../assets/images/gravitusimage/copyicon.svg';
import DoneIcon from '@mui/icons-material/Done';

import CopyToClipboard from 'react-copy-to-clipboard';

const Imps = ({ orderDetails }) => {
  const theme = useTheme();

  const paymethods = orderDetails?.payModes
    ?.filter(paymentMode => paymentMode.mode === 'IMPS')
    ?.map((paymentMode, index) => paymentMode.details) || [];

  console.log(paymethods)

  const paymentDetails = paymethods.map((paymethods) => JSON.parse(paymethods));

  const impsPayment = paymentDetails[0];

  //
  const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (id) => {
    setActiveId(id);
    setCopied(true);

    setTimeout(() => {
      setActiveId(null);
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Account Number
        </Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {impsPayment.accountNo}
          <CopyToClipboard text={impsPayment.accountNo} onCopy={() => handleCopy(1)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 1 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 1 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer', paddingLeft: '12px' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>

      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Beneficiary  Name</Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {impsPayment.accountName}
          <CopyToClipboard text={impsPayment.accountName} onCopy={() => handleCopy(2)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 2 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 2 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer', paddingLeft: '12px' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>

      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Bank Name
        </Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {impsPayment.bankName}
          <CopyToClipboard text={impsPayment.bankName} onCopy={() => handleCopy(3)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 3 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 3 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer', paddingLeft: '12px' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>

      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          IFSC Code
        </Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {impsPayment.IFSCCode}
          <CopyToClipboard text={impsPayment.IFSCCode} onCopy={() => handleCopy(4)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 4 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 4 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer', paddingLeft: '12px' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>
    </>
  )
}

export default Imps;
