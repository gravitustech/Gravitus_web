import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const keyframes = `
@keyframes wave {
  0% {
    transform: scale(.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.5);
  }
}
`;

const Wave = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  width: '4px',
  height: '25px',
  background: '#00BBAB',
  margin: '3px',
  animation: 'wave 1s linear infinite',
  borderRadius: '5px',
});

const WaveContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Lodergif = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent='center'
          alignItems='center'
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <Grid >
              <style dangerouslySetInnerHTML={{ __html: keyframes }} />
              <WaveContainer>
                {[...Array(5)].map((_, index) => (
                  <Wave key={index} style={{ animationDelay: `${index * 0.1}s` }} />
                ))}
              </WaveContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>

  );
};

export default Lodergif;