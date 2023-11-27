import React from 'react';
import { Grid, TableCell, Typography, Stack, TableRow, TableHead, useTheme, Table, TableContainer, TableBody, Box } from '@mui/material'; // Import necessary components
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
//buyorders
function createData(Price, Quantity, Cent) {
  return { Price, Quantity, Cent };
}

const rows = [
  createData('28,565.23', '0.2365255', '100%'),
  createData('28,565.23', '0.2365255', '40%'),
  createData('28,565.23', '0.2365255', '80%'),
  createData('28,565.23', '0.2365255', '20%'),
  createData('28,565.23', '0.2365255', '60%'),
  createData('28,565.23', '0.2365255', '70%'),
  createData('28,565.23', '0.2365255', '60%'),
  createData('28,565.23', '0.2365255', '80%')
];

//sellorders

const sellrows = [
  createData('27,565.23', '0.2365255', '60%'),
  createData('28,565.23', '0.2365255', '50%'),
  createData('28,565.23', '0.2365255', '10%'),
  createData('28,565.23', '0.2365255', '20%'),
  createData('28,565.23', '0.2365255', '90%'),
  createData('28,565.23', '0.2365255', '100%'),
  createData('28,565.23', '0.2365255', '90%'),
  createData('28,565.23', '0.2365255', '20%')
];

const Orderbooktab = ({ orderBookData, setSelectedOrder, priceData, isAuthorised }) => {
  console.log({ orderBookData });

  const theme = useTheme();
  const percentageBackgroundColor = '20%'; // Change this to your desired percentage color
  // const handleSelect = (row) => {
  //   console.log({ row });
  //   setSelectedOrder(row);
  // };
  const handleSelect = (row) => {
    if (row.price !== '--' && row.quantity !== '--') {
      console.log({ row });
      setSelectedOrder(row);
    }
  };
  return (
    // <Grid>
    <>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                padding='none'
                sx={{ border: 'none', padding: '2px', paddingBottom: '7px', paddingTop: '0px' }}
                key='Price'
                align='left'
              >
                <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  {/* Quantity(USDT) */}
                  Price({priceData?.sellPair})
                </Typography>
              </TableCell>
              <TableCell
                padding='none'
                sx={{ border: 'none', padding: '2px', paddingBottom: '7px', paddingTop: '0px' }}
                key='Quantity'
                align='right'
              >
                <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  {/* Quantity(EPX) */}
                  Quantity({priceData?.buyPair})
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {orderBookData?.asks.slice(-8).map((row, index) => {
              return (
                <TableRow
                  hover
                  sx={{
                    // '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                    backgroundImage:
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(to left, rgba(255, 20, 20, 0.16)  ${row.weight}%, transparent 0%)})`
                        : `linear-gradient(to left, #FFF0F0 ${row.weight}%, transparent 0%)})`
                  }}
                  tabIndex={-1}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <TableCell sx={{ border: 'none', padding: '2px' }} align="left">
                    <Stack direction='row' color="text.sell" alignItems='center' spacing={0.5}  >
                      {isAuthorised ? (
                        row.userId === '--' ? (
                          <></>
                        ) : (
                          row.userId === '3231266' ? (
                            <FiberManualRecordIcon fontSize='6px' sx={{ width: '8px' }} />
                          ) : (
                            <></>
                          )
                        )
                      ) : (
                        <></>
                      )}
                      {/* {row.userId} */}
                      <Typography variant="subtitle3" color="text.sell">
                        {row.price}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ border: 'none', padding: '2px' }} align="right">
                    <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {row.quantity}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        pt={0.9}
        pb={0.9}
        variant="h5"
        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
      >
        {priceData?.lastPrice}
      </Typography>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {orderBookData?.bids.slice(0, 8).map((row, index) => {
              return (
                // <Box sx={{ width: '100%', backgroundColor: '#E7FFFD', display: 'flex', justifyContent: 'space-between' }}>
                <TableRow
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                    backgroundImage:
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(to left, rgba(0, 72, 66, 0.5) ${row.weight}%, transparent 0%)})`
                        : `linear-gradient(to left, #E7FFFD ${row.weight}%, transparent 0%)})`
                  }}
                  tabIndex={-1}
                  key={index}
                  onClick={() => handleSelect(row)}
                >
                  <TableCell sx={{ border: 'none', padding: '2px' }} align="left">
                    <Stack direction='row' color="text.buy" alignItems='center' spacing={0.5}  >
                      {isAuthorised ? (
                        row.userId === '--' ? (
                          <></>
                        ) : (
                          row.userId === "3231266" ? (
                            <FiberManualRecordIcon fontSize='6px' sx={{ width: '8px' }} />
                          ) : (
                            <></>
                          )
                        )
                      ) : (
                        <></>
                      )}
                      {/* {row.userId} */}
                      <Typography variant="subtitle3" color="text.buy">
                        {row.price}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ border: 'none', padding: '2px' }} align="right">
                    <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {row.quantity}
                    </Typography>
                  </TableCell>
                </TableRow>
                // </Box>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // </Grid>
  );
};

export default Orderbooktab;
