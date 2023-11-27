import React from 'react';
import StepsComponents from '../../../../layout_gravitus/MainLayout/Header/HeaderContent/Profile/StepsComponents';
import { Typography, useTheme } from '@mui/material';

const Aboutgravitus = () => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        About Gravitus
      </Typography>
      <StepsComponents description="Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi nibh elit donec varius sed malesuada nisi." />
      <StepsComponents description="Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi nibh elit donec varius sed malesuada nisi." />
      <StepsComponents description="Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi nibh elit donec varius sed malesuada nisi." />
      <StepsComponents description="Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi nibh elit donec varius sed malesuada nisi." />
      <StepsComponents description="Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt semper habitant duis. Varius at morbi nibh elit donec varius sed malesuada nisi." />
    </>
  );
};

export default Aboutgravitus;
