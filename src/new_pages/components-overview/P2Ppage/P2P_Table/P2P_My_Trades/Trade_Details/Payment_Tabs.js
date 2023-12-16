import React from 'react'
import {
  Typography,
  Stack,
  useTheme,
  Tab,

} from '@mui/material';
import { TabContext, TabPanel, TabList } from "@mui/lab";

import Upi from './Payment_Tab_UPI';
import Imps from './Payment_Tab_IMPS';

const UpiImpsTabs = ({ orderDetails }) => {
  const theme = useTheme();

  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paymethods = orderDetails?.payModes
    ?.filter(paymentMode => paymentMode.mode === 'UPI' || paymentMode.mode === 'IMPS')
    ?.map((paymentMode, index) => paymentMode.mode) || [];

  const tabData = paymethods.map((mode, index) => ({
    value: index.toString(),
    label: mode,
    screen: mode === 'UPI' ? <Upi orderDetails={orderDetails} /> : <Imps orderDetails={orderDetails} />,
  }));

  return (
    <TabContext value={value}>
      <Stack direction='column' >
        <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
          {tabData.map((tab, index) => (
            <Tab
              disableRipple
              key={index}
              sx={{
                paddingBottom: '0px',
                paddingLeft: tab.value === '0' ? '0px' : '16px',
                minWidth: '0px',
                fontSize: value === tab.value ? '16px' : '16px',
                fontWeight: value === tab.value ? '700' : '400',
                color:
                  value === tab.value
                    ? theme.palette.mode === 'dark'
                      ? 'text.secondarydark'
                      : 'text.secondary'
                    : theme.palette.mode === 'dark'
                      ? 'text.primarydark'
                      : 'text.primary',
                '&:hover': {
                  color: value === tab.value ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
              }}
              label={

                tab.label

              }
              value={tab.value}
            />
          ))}
        </TabList>
        {tabData.map((tab, index) => (
          <TabPanel key={index} value={tab.value} sx={{ width: '100%', pt: 0, pl: 0 }}>
            {tab.screen}
          </TabPanel>
        ))}
      </Stack>
    </TabContext>
  )
}

export default UpiImpsTabs;
