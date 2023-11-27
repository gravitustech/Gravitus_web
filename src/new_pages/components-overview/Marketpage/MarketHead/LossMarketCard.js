import { useTheme, Typography, Stack, TableContainer, TableCell, TableRow, Table, TableBody } from '@mui/material';
import MainCard from '../../../../components/MainCard';

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary';
  }
}

function ComponentsCardLoss({ title, marketData }) {
  const theme = useTheme();
  const filteredlist = (marketData.listings)

  return (
    <MainCard
      contentSX={{ p: 2.25 }}
      sx={{
        border: 'none',
        backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
      }}
    >
      <Stack>
        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {title}
        </Typography>
      </Stack>

      <br />
      <TableContainer
        sx={{
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <TableBody>
            {filteredlist
              .filter(row => row[`24hChg`] < 0)
              .slice(0, 3)
              .map((row, index) => {
                return (
                  <TableRow
                    role="checkbox"
                    sx={{ border: 0, padding: '0', height: '42px' }}
                    tabIndex={-1}
                    key={row.platformId}
                  >
                    <TableCell sx={{ border: 'none', padding: '0' }} component="th" scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <img src={row.imagePath} alt="ico" width="24" height="24" />
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                          }}
                        >
                          <span style={{ marginLeft: '4px' }}> {row.tradePair}</span>
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                      <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                        {row.lastPrice}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', padding: '0' }} align="right">
                      <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                        {row[`24hChg`]}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default ComponentsCardLoss;
