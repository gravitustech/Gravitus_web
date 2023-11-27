import { TabContext } from '@mui/lab';
import { Button, MenuItem, Select, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react'

const TradeChart = ({ pairData }) => {
  const theme = useTheme();

  const [value, setValue] = useState('0');

  const handleOptionChange = (newValue) => {
    setValue(newValue);
  };

  // const [valuetime, setValuetime] = useState(0);

  // const options = ["1m", "15m", "30m", "1h", "1d", "1m", "15m", "30m", "1h", "1d",];
  const [valuetime, setValuetime] = useState(0);
  const options = ["1m", "15m", "30m", "1h", "1d", "1m", "15m", "30m", "1h", "1d"];

  // Split options into two arrays
  const visibleOptions = options.slice(0, 5);
  const dropdownOptions = options.slice(5);

  const handleChange = (event) => {
    setValuetime(event.target.value);
  };
  return (
    < >
      <Stack direction="row" spacing={5}>
        <Stack direction="row" spacing={1} p={2}>
          <Stack spacing={1} direction="row" alignItems="center">
            {pairData.cmc_chart === 1 && (
              <TabContext value={value}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" width="100%">
                    <Button
                      disableRipple
                      onClick={() => handleOptionChange('0')}
                      sx={{
                        fontSize: value === '0' ? '12px' : '12px',
                        fontWeight: value === '0' ? '500' : '500',
                        color:
                          value === '0' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                        backgroundColor:
                          value === '0'
                            ? theme.palette.mode === 'dark'
                              ? 'text.buy'
                              : 'text.buy'
                            : theme.palette.mode === 'dark'
                              ? '#2B2B2E'
                              : '#ECECEC',
                        borderRadius: '5px 0 0 5px',
                        minHeight: '32px !important',
                        width: '50%',
                        padding: '0',
                        '&:hover': {
                          backgroundColor:
                            value === '0'
                              ? theme.palette.mode === 'dark'
                                ? 'text.buy'
                                : 'text.buy'
                              : theme.palette.mode === 'dark'
                                ? '#2B2B2E'
                                : '#ECECEC'
                        }
                      }}
                    >
                      GA
                    </Button>
                    <Button
                      disableRipple
                      onClick={() => handleOptionChange('1')}
                      sx={{
                        fontSize: value === '1' ? '12px' : '12px',
                        fontWeight: value === '1' ? '500' : '500',
                        color:
                          value === '1' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                        backgroundColor:
                          value === '1'
                            ? theme.palette.mode === 'dark'
                              ? 'text.buy'
                              : 'text.buy'
                            : theme.palette.mode === 'dark'
                              ? '#2B2B2E'
                              : '#ECECEC',
                        borderRadius: '0 5px 5px 0',
                        minHeight: '32px !important',
                        width: '50%',
                        padding: '0',
                        '&:hover': {
                          backgroundColor:
                            value === '1'
                              ? theme.palette.mode === 'dark'
                                ? 'text.buy'
                                : 'text.buy'
                              : theme.palette.mode === 'dark'
                                ? '#2B2B2E'
                                : '#ECECEC'
                        }
                      }}
                    >
                      CMC
                    </Button>
                  </Stack>
                </Stack>

              </TabContext>
            )}
            {/* <div style={{ paddingRight: "120px" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {options.map((text, index) => (
                  <Button disableRipple key={index} onClick={() => setValuetime(index)}
                    sx={{
                      fontWeight: valuetime === index ? 700 : 400,
                      fontSize: valuetime === index ? "12px" : "12px",
                      color: valuetime === index ? theme.palette.mode === 'dark'
                        ? 'text.secondarydark'
                        : 'text.secondary'
                        : theme.palette.mode === 'dark'
                          ? 'text.primarydark'
                          : 'text.primary',
                      backgroundColor: 'transparent',
                      "&:hover": {
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div> */}
            <div style={{ paddingRight: "120px" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {visibleOptions.map((text, index) => (
                  <Button
                    disableRipple
                    key={index}
                    onClick={() => setValuetime(index)}
                    sx={{
                      fontWeight: valuetime === index ? 700 : 400,
                      fontSize: valuetime === index ? "12px" : "12px",
                      color: valuetime === index
                        ? theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                        : theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
                      backgroundColor: 'transparent',
                      "&:hover": {
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    {text}
                  </Button>
                ))}
                <Select
                  value={valuetime}
                  onChange={handleChange}
                  sx={{
                    display: valuetime >= 5 ? "block" : "block",
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  {dropdownOptions.map((text, index) => (
                    <MenuItem key={index} value={index + 5}>
                      {text}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <>
        <Stack>
          {value === '0' && (
            <>
              Gravitus Chart
            </>
          )}
          {value === '1' && (
            <>
              Coin marketcap Chart
            </>
          )}
        </Stack>
      </>
    </ >
  )
}

export default TradeChart;
