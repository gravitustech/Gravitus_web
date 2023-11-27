import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography, useTheme } from '@mui/material';

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary';
  }
}

export default function Marketoverview({ marketData }) {
  const theme = useTheme();

  const filteredlist = (marketData?.listings);

  return (
    <TableContainer  >
      <Table aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell variant='subtitle2' sx={{ border: 'none', paddingBottom: '4px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Name</TableCell>
            <TableCell variant='subtitle2' sx={{ border: 'none', paddingBottom: '4px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} align="left">Market Price</TableCell>
            <TableCell variant='subtitle2' sx={{ border: 'none', paddingBottom: '4px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} align="left">24h change </TableCell>
            <TableCell variant='subtitle2' sx={{ border: 'none', paddingBottom: '4px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} align="left">24h Volume</TableCell>
            <TableCell variant='subtitle2' sx={{ border: 'none', paddingBottom: '4px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        {filteredlist && filteredlist.length > 0 ? (
          <TableBody>
            {filteredlist.slice(0,7).map((row) => (
              <TableRow
                key={row.tradePair}
                sx={{ height: '56px' }}
              >
                <TableCell sx={{ border: 'none' }} component="th" scope="row" align="left">
                  <Stack direction="row" alignItems="center" spacing={.5}>
                    <img src={row.imagePath} alt="ico" width="24" height="24" />
                    <Typography variant='body1' sx={{
                      color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
                    }}>
                      <span style={{ marginLeft: '2px' }}>{row.tradePair}</span>
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell sx={{ border: 'none' }} align="left">
                  <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                    {row.lastPrice}
                  </Typography>
                </TableCell>

                <TableCell sx={{ border: 'none', }} align="left">
                  <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                    {row[`24hChg`]}%
                  </Typography>
                </TableCell>

                <TableCell sx={{ border: 'none' }} align="left" >
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    {row[`24hVolume`]}
                  </Typography>
                </TableCell>

                <TableCell sx={{ border: 'none' }} align="right">
                  <Typography paddingRight='6px' variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    {row[`24hVolume`]}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <p>No data to display</p>
        )}

      </Table>
    </TableContainer>
  );
}
