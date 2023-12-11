import CopyIcon from '../../../../../../assets/images/gravitusimage/copyicon.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import DoneIcon from '@mui/icons-material/Done';

import React, { useState } from 'react';

import {
  Typography,
  Stack,
  useTheme,
  Tooltip,
  IconButton
} from '@mui/material';

const Upi = ({ orderDetails }) => {
  const theme = useTheme();

  const paymethods = orderDetails?.payModes
    ?.filter(paymentMode => paymentMode.mode === 'UPI')
    ?.map((paymentMode, index) => paymentMode.details) || [];

  const paymentDetails = paymethods.map((paymethods) => JSON.parse(paymethods));
  const upiPayment = paymentDetails[0];

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
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Name</Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {upiPayment.name}
          <CopyToClipboard text={upiPayment.name} onCopy={() => handleCopy(1)}>
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
          UPI Id
        </Typography>
        <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {upiPayment.upiId}
          <CopyToClipboard text={upiPayment.upiId} onCopy={() => handleCopy(2)}>
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
    </>
  )
}

export default Upi;
