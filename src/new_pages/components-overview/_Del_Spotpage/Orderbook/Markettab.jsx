import React from 'react';
import { Grid, TableCell, Typography, Stack, TableRow, TableHead, useTheme, TableContainer, Table } from '@mui/material'; // Import necessary components
import dayjs from 'dayjs';

function createData(Price, Quantity, Time) {
  return { Price, Quantity, Time };
}

const headCells = [
  {
    id: 'Price',
    align: 'left',
    disablePadding: true,
    label: 'Price'
  },
  {
    id: 'Quantity',
    align: 'center',
    disablePadding: true,
    label: 'Quantity'
  },
  {
    id: 'Time',
    align: 'right',
    disablePadding: false,
    label: 'Time'
  }
];

const rows = [
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM'),
  createData('28,565.23', '0.2365255', '16 Aug, 01:23PM')
];
const Markettab = ({ marketTradesData }) => {
  const theme = useTheme();
  console.log(new Date(marketTradesData[0].timeStamp).toGMTString(), new Date(marketTradesData[0].timeStamp).toLocaleString());
  console.log({ marketTradesData });
  return (
    <Grid p={0}>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root:last-of-type(3)': {
                  pl: 5
                }
              }}
            >
              {headCells.map((headCell) => (
                <TableCell
                  padding='none'
                  sx={{ border: 'none', padding: '2px', paddingBottom: '4px', paddingTop: '0' }}
                  key={headCell.id}
                  align={headCell.align}
                >
                  <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {headCell.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {marketTradesData.slice(0, 17).map((row) => {
            return (
              <TableRow
                sx={{
                  // '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  height: '8px'
                }}
                tabIndex={-1}
                key={row.timeStamp}
              >
                <TableCell sx={{ border: 'none', padding: '2px', paddingBottom: '3px' }} align="left">
                  <Typography variant="subtitle3" sx={{ color: row.signal === "--" ? theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' : (row.signal === "HIGH" ? 'text.buy' : 'text.sell') }}
                  >
                    {row.price}
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: 'none', padding: '2px', paddingBottom: '3px' }} align="center">
                  <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {row.quantity}
                  </Typography>
                </TableCell>

                <TableCell sx={{ border: 'none', padding: '2px', paddingBottom: '3px' }} align="right">
                  <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {/* {row.timeStamp ? new Date(Number(row.timeStamp)).toLocaleString() : '--'}  hour12: false,*/}
                    {row.timeStamp ? new Date(Number(row.timeStamp)).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--'}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Markettab;
