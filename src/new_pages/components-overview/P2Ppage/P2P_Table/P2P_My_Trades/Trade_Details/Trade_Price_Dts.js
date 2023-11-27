import React from 'react'
import {
  Typography,
  Stack,
  useTheme
} from '@mui/material';

const Trade_Price_Dts = ({ orderDetails }) => {
  const theme = useTheme();
  return (
    <Stack>
      <Stack pt={4} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Price</Typography>
        <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {orderDetails?.atPrice} {orderDetails?.pricePair}
        </Typography>
      </Stack>

      <Stack pt={3} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Quantity</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {orderDetails?.quantity} {orderDetails?.tradePair}
        </Typography>
      </Stack>

      <Stack pt={3} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Total Amount</Typography>
        <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {orderDetails?.amount} {orderDetails?.pricePair}
        </Typography>
      </Stack>

      <Stack pt={3} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Order No</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {orderDetails?.orderId}
        </Typography>
      </Stack>

    </Stack>
  )
}

export default Trade_Price_Dts;
