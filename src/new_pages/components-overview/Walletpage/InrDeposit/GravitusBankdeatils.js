import React, { useState } from 'react';

import { Typography, Stack, useTheme, Tooltip, IconButton } from '@mui/material';

import CopyIcon from '../../../../assets/images/gravitusimage/copyicon.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import DoneIcon from '@mui/icons-material/Done';

const GravitusBankdeatils = ({ depositTo }) => {
  const theme = useTheme();

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
    <Stack>
      <Stack pt={2} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Account No 
        </Typography>
        <Typography variant="title2" color="text.buy">
          {depositTo?.accountNo}
          <CopyToClipboard text={depositTo?.accountNo} onCopy={() => handleCopy(1)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 1 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 1 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>
      <Stack pt={1} direction="row" justifyContent="space-between" alignItems='center'>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Beneficiary Name
        </Typography>
        <Typography variant="body1" color="text.buy" pt={.5}>
          {depositTo?.accountName}
          <CopyToClipboard text={depositTo?.accountName} onCopy={() => handleCopy(2)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 2 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 2 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between" alignItems='center'>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Bank Name
        </Typography>
        <Typography variant="title2" color="text.buy">
          {depositTo?.bankName}
          <CopyToClipboard text={depositTo?.bankName} onCopy={() => handleCopy(3)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 3 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 3 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between"  alignItems='center'>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Account Type
        </Typography>
        <Typography variant="title2" color="text.buy" pr={4.1}>
          {depositTo?.accountType}
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between"  alignItems='center'>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          IFSC Code
        </Typography>
        <Typography variant="title2" color="text.buy">
          {depositTo?.IFSCCode}
          <CopyToClipboard text={depositTo?.IFSCCode} onCopy={() => handleCopy(4)}>
            <Tooltip placement="top" disableFocusListener title={activeId === 4 && copied ? 'Copied' : 'Click to copy'} arrow>
              <IconButton disableRipple>
                {activeId === 4 && copied ? (
                  <DoneIcon color="#C1C1C1" />
                ) : (
                  <img src={CopyIcon} alt="copy" style={{ cursor: 'pointer' }} />
                )}
              </IconButton>
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default GravitusBankdeatils;
