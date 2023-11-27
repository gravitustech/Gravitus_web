import { Container, Grid, useTheme } from '@mui/material';
import React from 'react'
import { styled } from "@mui/material/styles";
const ArcTransitionContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  transformOrigin: 'top right',
  transform: 'skewX(-45deg)',
});

const ArcContent = styled('div')({
  width: '100%',
  height: '100%',
  transform: 'skewX(45deg)',
  background: 'linear-gradient(to bottom left, #ff9800, #f44336)',
  animation: '$arcAnimation 4s ease-in-out infinite',
});

const keyframes = {
  '0%, 100%': {
    transform: 'translate(0%, -100%)',
  },
  '50%': {
    transform: 'translate(-100%, 0%)',
  },
};


const Featuresn = () => {
  const theme = useTheme();

  return (
    <Grid container
      pt={12} pb={12}
      sx={{
        background: theme.palette.mode === 'dark' ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))' : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
        height: 'auto'
      }}
    >
      <svg width="100%" >
        <g transform="rotate(180.900 750 200)">
          <path
            d="M0,400 Q1800,115 1500,380"
            // fill="none"
            stroke='red'
            // "rgba(195, 235, 231, 0.50)"
            strokeWidth="6"
          />
        </g>
      </svg>
    </Grid>
  )
}

export default Featuresn;
// stroke="url(#paint0_linear_2142_2703)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"