import {
  useTheme, Typography, Stack,
  Grid, Card
} from '@mui/material';

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary';
  }
}

function CurrencyCard({ MarketData }) {
  const theme = useTheme();
  const filteredlist = (MarketData?.result?.listings);

  return (
    filteredlist?.slice(1)?.map((row, index) => {
      return (
        <Stack key={index}>
          <Card
            sx={{
              height: '180px',
              width: '320px',
              padding: '2.2px',
              boxShadow: 'none',
              border: 'none',
              borderRadius: '10px',
              background:
                theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground',
                cursor:'pointer'
            }}>
            <Grid p={2.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <img src={row.imagePath} alt="ico" width="26" height="26" />
                <Typography
                  variant="title1"
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                  }}
                >
                  <span style={{ marginLeft: '4px' }}> {row.tradePair}</span>
                </Typography>
              </Stack>

              <Stack spacing={2} pt={3}>
                <Stack direction="row" justifyContent='space-between'>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Market Price
                    </Typography>
                  </Stack>

                  <Stack alignItems="flex-end">
                    <Typography sx={{ color: getColor(row[`24hChg`], theme) }} variant="body1" noWrap>
                      {row.lastPrice}
                    </Typography>
                  </Stack>
                </Stack>


                <Stack direction="row" justifyContent='space-between'>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      24h change
                    </Typography>
                  </Stack>

                  <Stack alignItems="flex-end">
                    <Typography sx={{ color: getColor(row[`24hChg`], theme) }} variant="body1" noWrap>
                      {row[`24hChg`]}%
                    </Typography>
                  </Stack>
                </Stack>


                <Stack direction="row" justifyContent='space-between'>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      24h Buy Volume
                    </Typography>
                  </Stack>

                  <Stack alignItems="flex-end">
                    <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="body1" noWrap>
                      {row[`24hBuyVol`]}
                    </Typography>
                  </Stack>
                </Stack>

              </Stack>
            </Grid>
          </Card>
        </Stack>
      )
    }
    )
  );
}


export default CurrencyCard;
