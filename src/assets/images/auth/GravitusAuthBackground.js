import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //
import logoside from '../../../assets/images/logoside.svg';

const GravitusAuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: '20%', willChange: 'transform' }}>
      <img src={logoside} alt="Mantis" width="100%" />
    </Box>
  );
};

export default GravitusAuthBackground;
