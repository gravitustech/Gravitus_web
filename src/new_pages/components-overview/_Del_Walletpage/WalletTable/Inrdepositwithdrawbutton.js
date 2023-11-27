import React, { useState } from 'react';
import { Box, Paper, Popper, Stack, Button, Typography, useTheme, ClickAwayListener } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Transitions from '../../../../components/@extended/Transitions';
import doticon from '../../../../assets/images/gravitusimage/doticon.svg';
import InrIcon from '../../../../assets/images/gravitusimage/Inricon.svg';
import InrDeposit from '../../../../assets/images/gravitusimage/Inrdeposit.svg';
import ArrowRightIcon from '../../../../assets/images/gravitusimage/arrowrighticon.svg';
// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Inrdepositwithdrawbutton = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const popoverhandleClose = () => {
    setAnchorEl(null);
  };

  const popoveropen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={handleClick} variant="inrdepositwithdrawbutton">
          <Stack direction="row" spacing={1}>
            <img src={InrIcon} alt="InrIcon" width={16} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              INR Deposit/Withdraw
            </Typography>
          </Stack>
        </Button>
        <Popper
          id={id}
          open={popoveropen}
          anchorEl={anchorEl}
          onClose={popoverhandleClose}
          placement="bottom-end"
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 9]
                }
              }
            ]
          }}
        >
          {({ TransitionProps }) => (
            <Transitions type="fade" in={popoveropen} {...TransitionProps}>
              {popoveropen && (
                <Paper>
                  <ClickAwayListener onClickAway={popoverhandleClose}>
                    <Stack
                      sx={{
                        padding: '16px',
                        alignItems: 'center',
                        bgcolor: theme.palette.mode === 'dark' ? 'text.black' : 'text.background',
                        border: theme.palette.mode === 'dark' ? '0.1px solid #262626' : '0.2 solid #fff'
                      }}
                      pt={1}
                    >
                      <Button component={RouterLink} to="/inrdeposit" variant="inrdepositbutton">
                        <Stack direction="row" spacing={1} pr={0}>
                          <img src={InrDeposit} alt="InrDeposit" width={30} />
                          <Typography
                            pl={1.5}
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                            pt={0.5}
                          >
                            INR Deposit
                          </Typography>
                          <Stack pl={2} pt={1.2}>
                            <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                          </Stack>
                        </Stack>
                      </Button>
                      <br />
                      <Button component={RouterLink} to="/inrwithdraw" variant="inrdepositbutton">
                        <Stack direction="row" spacing={1.5}>
                          <img src={InrDeposit} alt="InrDeposit" width={30} />
                          <Typography
                            pl={1}
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                            pt={0.5}
                          >
                            INR Withdraw
                          </Typography>
                          <Stack pt={1.2}>
                            <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                          </Stack>
                        </Stack>
                      </Button>
                    </Stack>
                  </ClickAwayListener>
                </Paper>
              )}
            </Transitions>
          )}
        </Popper>
      </Stack>
    </Box>
  );
};

export default Inrdepositwithdrawbutton;
