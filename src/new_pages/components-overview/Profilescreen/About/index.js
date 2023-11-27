import React from 'react'
import { Grid, Box } from '@mui/material';
import Aboutgravitus from './Aboutgravitus';
// import GravitusAcademy from './GravitusAcademy';

const About = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={6} pr={6}>
        <Grid item xs={12} md={5.5}>
          Image
        </Grid>
        <Grid md={1}>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Aboutgravitus />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <GravitusAcademy />
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default About;
