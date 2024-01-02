import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';

import { getConfig_ng, setConfig_ng } from 'src/utils_ng/localStorage_ng';

const GraCmcButton = (pairData) => {

  const [selectedButton, setSelectedButton] = useState(getConfig_ng('excType'));

  function changeExcTypeButton(exchangeType) {
    setConfig_ng('excType', exchangeType);
    setSelectedButton(exchangeType);
  }
  return (
    < >
      {pairData?.cmc_chart === 1 && (
        <Stack pb={1} direction='row' alignItems='center' spacing={3}>
          <Stack direction='row'>
            <Button
              disableRipple
              onClick={() => {
                changeExcType('GRA');
                changeExcTypeButton('GRA');
              }}
              sx={{
                height: '50%',
                borderRadius: '5px 0 0 5px',
                minHeight: '32px !important',
                fontSize: selectedButton === 'GRA' ? '12px' : '12px',
                fontWeight: selectedButton === 'GRA' ? '500' : '500',
                color: selectedButton === 'GRA' ? (theme.palette.mode === 'dark' ? 'text.white' : 'text.white') : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                '&:hover': {
                  backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                },
              }}
            >
              GRA
            </Button>
            <Button
              disableRipple
              onClick={() => {
                changeExcType('CMC');
                changeExcTypeButton('CMC');
              }}
              sx={{
                borderRadius: '0 5px 5px 0',
                height: '50%',
                minHeight: '32px !important',
                fontSize: selectedButton === 'CMC' ? '12px' : '12px',
                fontWeight: selectedButton === 'CMC' ? '500' : '500',
                color: selectedButton === 'CMC' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                padding: '0',
                '&:hover': {
                  backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                },
              }}
            >
              CMC
            </Button>
          </Stack >
        </Stack>
      )}
    </ >
  )
}

export default GraCmcButton
