import PropTypes from 'prop-types';
// import { useState } from 'react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme, Grid, List, Divider } from '@mui/material';
import Button from '../../overrides/Button';
import MainCard from 'src/components/MainCard';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
function createData(Heading, Description, Time,) {
  return { Heading, Description, Time, };
}
const rows = [
  createData(
    'Welcome to all',
    'We are happy to announce that our new version is live.',
    '09 Sep, 02 PM',
  ),
  createData(
    'Deposit Explanation',
    'If you own cryptocurrency on another platform or wallet, you can transfer it to your Gravitus Wallet for trading or grow your crypto holdings with our suite of services on Gravitus Earn.',
    '21 Oct, 12 PM',
  ),
  createData(
    'Deposit Explanation',
    'If you own cryptocurrency on another platform or wallet, you can transfer it to your Gravitus Wallet for trading or grow your crypto holdings with our suite of services on Gravitus Earn.',
    '21 Oct, 12 PM',
  ),
];
// ==============================|| Notificationtable ||============================== //
const Description = ({ description }) => {
  const theme = useTheme();

  const [textToDisplay, setTextToDisplay] = useState(
    description.length > 100 ? description.substring(0, 100) + '...' : description
  );

  const handleTextClick = () => {
    // If the text is not expanded, show it all
    if (description.length > 100 && textToDisplay.length <= 103) {
      setTextToDisplay(description);
    }
    // If the text is already expanded, contract it back
    else if (description.length > 100 && textToDisplay.length > 100) {
      setTextToDisplay(description.substring(0, 100) + '...');
    }
  };
  return (
    <>
      <Typography
        pr={62}
        onClick={handleTextClick}
        pt={1} variant="body1"
        sx={{
          color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
          cursor: 'pointer'
        }}>
        {textToDisplay}
      </Typography>
    </>
  );
};

export default function Notificationtable() {
  const theme = useTheme();

  return (
    <>
      <Grid sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'text.black' : 'text.white',
        width: '100%',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' },
        overflowY: 'scroll',
        /* Custom scrollbar styles */
        scrollbarWidth: 'thin',
        scrollbarColor: 'gray lightgray',
        height: '534px',
        '&::-webkit-scrollbar': {
          width: '4px', // Width of the scrollbar
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.mode === "dark" ? 'black' : "text.background", // Track color
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === "dark" ? 'gray' : "lightgray",
          borderRadius: '8px', // Round the corners of the thumb
        },
      }}>
        {rows.length === 0 ? (
          <><TableContainer varaint="tablecontainer">
            <Table aria-labelledby="tableTitle">
            </Table>
          </TableContainer>
            <Norecordfoundcomponents
              description='No Record Found' />
          </>
        ) : (
          rows.map((row, index) => {
            return (
              <>
                <MainCard
                  sx={{
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    color: theme.palette.mode === 'dark' ? 'text.black' : 'text.white',
                    backgroundColor: theme.palette.mode === 'dark' ? 'text.black' : 'text.white',
                    borderRadius: '0',
                    // '&:hover': {
                    //   color: theme.palette.mode === 'dark' ? 'lightgrey' : '#D8D8D8', 
                    //   backgroundColor: theme.palette.mode === 'dark' ? 'lightgrey' : '#D8D8D8', 
                    // }
                  }}
                  elevation={0}
                  border={false}
                  content={false}
                  key={row.Time}
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                      }
                    }}
                  >
                    <Stack pt={1} pb={1} p={2}>
                      <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.Heading}
                        </Typography>
                        <Typography textAlign='end' alignItems='end' variant="body2" noWrap sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {row.Time}
                        </Typography>
                      </Grid>
                      <Description description={row.Description} />
                      {/* <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {row.Description}
                    </Typography> */}
                    </Stack>
                  </List>
                </MainCard>
                <Divider />
              </>

            )
          })
        )}
      </Grid>
    </>
  );
}
