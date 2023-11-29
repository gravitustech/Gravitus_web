import React, { useState } from 'react';

import { Stack, useTheme, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Chatscreen from './Chat_Screen';
import AppealChatscreen from './Chat_Screen_APL';
import CustomSnackBar from 'src/components/snackbar';

import useSWR, { mutate } from 'swr';
import { P2P_AppealMessages_URL, P2P_TradeMessages_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng';
import { getConfig_ng, setConfig_ng } from '../../../../../../utils_ng/localStorage_ng';

const Chat_Appeal_Tab = ({ resultdata, counterPart, appealMessage }) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [value, setValue] = React.useState('0'); // Chat or Appeal Tab
  const orderDetails = resultdata?.orderDetails;

  console.log('orderDetails', orderDetails)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function useTradeMessages() {
    var postData = {
      orderId: orderDetails?.orderId,
      platformId: getConfig_ng('P2PPair').platformId
    };

    const { data, error, isLoading, isValidating } = useSWR([P2P_TradeMessages_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading }
  }

  const { data, error } = useTradeMessages();

  function useAppealMessages() {
    var postData = {
      platformId: getConfig_ng('P2PPair').platformId,
      orderId: orderDetails?.orderId,
    };

    const { data, error, isLoading, isValidating } = useSWR([P2P_AppealMessages_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading }
  }

  const { data: Appealdata, error: Appealerror } = useAppealMessages();

  console.log('AppealData', Appealdata);

  return (
    <>
      <TabContext value={value}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" pl={10}>
            <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
              <Tab
                disableRipple
                sx={{
                  fontSize: value === '0' ? '14px' : '14px',
                  fontWeight: value === '0' ? '500' : '500',
                  color: value === '0' ? theme.palette.mode === 'dark' ? 'white' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black',
                  backgroundColor: value === '0' ? theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' : theme.palette.mode === 'dark' ? '#2B2B2E' : '#ECECEC',
                  borderRadius: '5px  0 0 5px',
                  minHeight: '40px',
                }}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    Chat
                  </div>
                }
                value="0"
              />
              <Tab
                disableRipple
                sx={{
                  fontSize: value === '1' ? '14px' : '14px',
                  fontWeight: value === '1' ? '500' : '500',
                  color: value === '1' ? theme.palette.mode === 'dark' ? 'white' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black',
                  backgroundColor: value === '1' ? theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' : theme.palette.mode === 'dark' ? '#2B2B2E' : '#ECECEC',
                  borderRadius: '0 5px 5px 0',
                  minHeight: '40px',
                }}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    Appeal History
                  </div>
                }
                value="1"
              />
            </TabList>
          </Stack>
        </Stack>

        <TabPanel value="0" sx={{ padding: '0', paddingTop: '12px' }} >
          < Chatscreen
            messages={data?.result?.messages}
            orderDetails={data?.result?.orderDetails}
            counterPart={counterPart}
            mutate={mutate}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </TabPanel>
        <TabPanel value="1" sx={{ padding: '0', paddingTop: '12px' }}>
          <AppealChatscreen
            messages={appealMessage}
            orderDetails={data?.result?.orderDetails}
            counterPart={counterPart}
            mutate={mutate}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage} />
        </TabPanel>
      </TabContext>
      <>
        <CustomSnackBar
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          snackbarMessage={snackbarMessage && snackbarMessage.msg}
          success={snackbarMessage && snackbarMessage.success}
        />
      </>
    </>
  )
}

export default Chat_Appeal_Tab;
