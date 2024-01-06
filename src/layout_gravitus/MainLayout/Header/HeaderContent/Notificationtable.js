import PropTypes from 'prop-types';
// import { useState } from 'react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme, Grid, List, Divider, Card } from '@mui/material';
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
     '23/12/2023, 11:00 Am',
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
      <Grid >
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
                <Card
                  key={index}
                  sx={{
                    width:'100%',
                    backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                    boxShadow: 'none',
                  }}>
                  <Stack spacing={1} pr={2} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                    <Stack direction="row" justifyContent="space-between" >
                      <Stack spacing={1} textAlign='start' justifyContent='start'>
                        <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.Heading}
                        </Typography>
                      </Stack>

                      <Stack spacing={1} textAlign='end' justifyContent='end'>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {row.Time}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" >
                      <Stack spacing={1} textAlign='start' justifyContent='start'>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          <Description description={row.Description} />
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
                <Stack pt={1} pb={1}>
                  <Divider></Divider>
                </Stack>
              </>
            )
          })
        )}
      </Grid>
    </>
  );
}
