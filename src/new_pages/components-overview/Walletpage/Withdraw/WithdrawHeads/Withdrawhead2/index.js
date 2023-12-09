import React from 'react';

import { Grid, Typography, Stack, Card, useTheme } from '@mui/material';
import Tips from '../../../../../../assets/images/gravitusimage/tips.svg';
import Importantnotes from './Importantnotes';

const Withdrawhead2 = () => {

  const theme = useTheme();
  
  return (
    <Grid>
      <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        Disclaimer*
      </Typography>
      <Stack direction="column" spacing={3} pt={4}>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Please review the destination address carefully before initiating any withdrawals to smart contract addresses.
          We do not support payments or participation in ICOs/Airdrops, and funds sent to such addresses may be lost forever.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Additionally, it is crucial to ensure that the network you choose for deposit matches the withdrawal network.
          Sending assets to the wrong network may result in the loss of your funds.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Once you submit a withdrawal request, it cannot be cancelled or reversed. Please exercise caution and double-check all
          withdrawal details before proceeding.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Your security and the safety of your assets are important to us. If you have any doubts or concerns,
          please reach out to our support team for assistance before proceeding with your withdrawal.
        </Typography>
      </Stack>
      {/* <Grid pt={5}>
        <Card
          width={100}
          sx={{
            borderRadius: '23px',
            backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#FBFBFB',
            boxShadow: 'none',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary',
            padding: '16px'
          }}
        >
          <Stack direction="row" spacing={1}>
            <img src={Tips} alt="Tips" />
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Tip of the day
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi n.
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid> */}
      <Grid pt={5}>
        {/* <Importantnotes /> */}
      </Grid>
    </Grid>
  );
};

export default Withdrawhead2;
