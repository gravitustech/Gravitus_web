import { Card, Grid, Typography, useTheme } from '@mui/material';
import React from 'react'

const GravitusAcademy = () => {
  const theme=useTheme();
  return (
    <Grid>
      <Grid>
        <Typography pt={3} variant='h4' sx={{ textAlign: 'center',color:theme.palette.mode==='dark'?'text.secondarydark':'text.secondary' }} >
          Gravitus Academy
        </Typography>
      </Grid>
      <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Card>
          hi
        </Card>
        <Card>
          Hi
        </Card>
        <Card>
          Hi
        </Card>
      </Grid>
    </Grid>
  )
}

export default GravitusAcademy;
