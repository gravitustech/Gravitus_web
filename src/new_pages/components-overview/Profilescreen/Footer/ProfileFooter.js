import { Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const ProfileFooter = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      pl={{ md: 6, sm: 8, xs: 6, lg: 3 }}
      pr={{ md: 6, sm: 8, xs: 6, lg: 3 }}
      pb={3}
      pt={3}
    >
      <Divider
        sx={{
          width: '100%',
        }}
      ></Divider>
      <Container>
        <Typography pt={2} textAlign="center" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          &copy; 2024 Gravitus
        </Typography>
      </Container>
    </Grid>
  );
};

export default ProfileFooter;
