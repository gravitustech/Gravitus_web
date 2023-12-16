
import { Stack, useTheme, Tab, Badge } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Chatscreen from './Chat_Screen';
import AppealChatscreen from './Chat_Screen_APL';
import CustomSnackBar from 'src/components/snackbar';

import useSWR, { mutate } from 'swr';
import React, { useState, useEffect } from 'react';
import { socket } from '../../../../../../socket';

import { P2P_OrderDetails_URL, P2P_AppealMessages_URL, P2P_TradeMessages_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../../utils_ng/localStorage_ng';

const Chat_Appeal_Tab = ({ orderData, counterPart, appealMessage }) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [value, setValue] = React.useState('0'); // Chat or Appeal Tab
  const orderDetails = orderData?.orderDetails;

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

  const {
    data: chatData,
    error: chatError
  } = useTradeMessages();

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

  const {
    data: Appealdata,
    error: Appealerror
  } = useAppealMessages();

  useEffect(() => {

    let P2POrderEvent = '/P2POrder_' + getConfig_sp().userId + '/POST';
    socket.on(P2POrderEvent, function (res) {

      console.log(res, 'Super Res');
      if (orderDetails.orderId == res.orderId && res.notifyType == 'notifyMessage') {
        mutate(P2P_TradeMessages_URL); // Temp solution need to update chat array
      }
      else if (orderDetails.orderId == res.orderId && res.notifyType == 'updateAppeal') {
        mutate(P2P_AppealMessages_URL); // Temp solution need to update appeal array
      }

    });

    return () => {
      socket.off(P2POrderEvent);
    };

  }, []);

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
                  backgroundColor: value === '0' ? theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' : theme.palette.mode === 'dark' ? '#262b39 ' : '#ECECEC',
                  borderRadius: '5px  0 0 5px',
                  minHeight: '40px',
                }}
                label={
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <span style={{ marginRight: '16px' }}>Chat</span>
                  {/* <Badge badgeContent={2} color="primary">
                  </Badge> */}
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
                  backgroundColor: value === '1' ? theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' : theme.palette.mode === 'dark' ? '#262b39' : '#ECECEC',
                  borderRadius: '0 5px 5px 0',
                  minHeight: '40px',
                }}
                label={
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <span style={{ marginRight: '16px' }}>  Appeal History</span>
                  {/* <Badge badgeContent={2} color="primary">
                  </Badge> */}
                </div>
                }
                value="1"
              />
            </TabList>
          </Stack>
        </Stack>

        <TabPanel value="0" sx={{ padding: '0', paddingTop: '12px' }} >
          < Chatscreen
            messages={chatData?.result?.messages}
            orderDetails={chatData?.result?.orderDetails}
            counterPart={counterPart}
            mutate={mutate}
            setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage}
          />
        </TabPanel>
        <TabPanel value="1" sx={{ padding: '0', paddingTop: '12px' }}>
          <AppealChatscreen
            messages={appealMessage}
            // messages={Appealdata?.result?.appealMessage}
            orderDetails={Appealdata?.result?.orderDetails}
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