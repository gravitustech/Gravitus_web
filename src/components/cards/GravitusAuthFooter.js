// material-ui
import { Container, Typography, useTheme } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const GravitusAuthFooter = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="xl">
      <Typography
        variant="subtitle1"
        style={{ textAlign: 'center', color: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary' }}
      >
        &copy; 2024 Gravitus&nbsp;
      </Typography>
    </Container>
  );
};

export default GravitusAuthFooter;
