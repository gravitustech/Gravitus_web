import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, useTheme, Grid, Stack } from '@mui/material';
import pageimg from '../../../assets/images/gravitusimage/404pageimg.svg';
import logo from '../../../assets/images/gravitusimage/footerlogo.svg';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const theme = useTheme();

  return (
    <>
      <Grid>
        {/* <Grid
          pt={5}
          pl={5}
         >
          <img src={logo} alt='logo' width={150} />
        </Grid> */}

        <Grid
          pt={5}
          style={{
            justifyContent: 'center',
            textAlign: 'center',
          }}
          display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}
        >
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
            <img src={pageimg} alt='pageimg' width={700} />
          </StyledContent>

        </Grid>

        <Grid
          pt={5}
          style={{
            justifyContent: 'center',
            textAlign: 'center',
          }}
          display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
        >

          <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
            <img src={pageimg} alt='pageimg' width={350} />
          </StyledContent>
        </Grid>
        <Grid p={{
          lg: 7.1, sm: 7.1,xs:5
        }} sx={{
          backgroundColor: '#00413C',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          height: '100%'
        }}>
          <Stack spacing={3} pb={3}>
            <Typography variant="h1" paragraph sx={{ color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white' }}>
              Sorry, page not found!
            </Typography>

            <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
              spelling.
            </Typography>
          </Stack>
          <Button to="/" size="large" variant="pagebutton404" component={RouterLink}>
            Go to Home
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
