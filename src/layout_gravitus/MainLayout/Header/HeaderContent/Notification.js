import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  Stack,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router';

// project import
import MainCard from '../../../../components/MainCard';
import Transitions from '../../../../components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //
function createData(Heading, Description, Time) {
  return { Heading, Description, Time };
}
const rows = [
  createData('Welcome to all', 'We are happy to announce that our new version is live.', '09 Sep, 02 PM'),
  createData(
    'Deposit Explanation',
    'If you own cryptocurrency on another platform or wallet, you can transfer it to your Gravitus Wallet for trading or grow your crypto holdings with our suite of services on Gravitus Earn.',
    '21 Oct, 12 PM'
  )
];

const Description = ({ description }) => {
  const theme = useTheme();

  const [textToDisplay, setTextToDisplay] = useState(description.length > 100 ? description.substring(0, 100) + '...' : description);

  const handleTextClick = () => {
    // If the text is not expanded, show it all
    if (description.length > 100 && textToDisplay.length <= 103) {
      setTextToDisplay(description);
    }
    // If the text is already expanded, contract it back
    else if (description.length > 100 && textToDisplay.length > 100) {
      setTextToDisplay(description.substring(0, 100) + '...');
    }
  };
  return (
    <>
      <Typography
        pt={1}
        onClick={handleTextClick}
        variant="body1"
        sx={{
          cursor: 'pointer',
          color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
        }}
      >
        {textToDisplay}
      </Typography>
    </>
  );
};

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 0.75
      }}
    >
      <IconButton
        disableRipple
        color="secondary"
        sx={{
          color: 'text.primary',
          bgcolor: 'none',
          width: '32px',
          height: '32px'
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={2} color="primary">
          <BellOutlined color="red" style={{ fontSize: 18 }} />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  elevation={0}
                  border={false}
                  content={false}
                >
                  <Stack pl={2} pr={1.2} pt={2} pb={0.5} onClickAway={handleClose}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        Notification
                      </Typography>
                      <IconButton
                        disableRipple
                        // size="small"
                        edge="end"
                        onClick={handleToggle}
                        aria-label="close"
                      >
                        <CloseOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {rows.length === 0 ? (
                      <>
                        <Grid pl={14} pr={14} pt={2} pb={2}>
                          <Stack
                            alignItems="center"
                            spacing={1}
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                          >
                            <NotificationsNoneIcon />
                            <Typography textAlign="center" variant="body1">
                              No New Notification
                            </Typography>
                          </Stack>
                        </Grid>
                      </>
                    ) : (
                      rows.map((row, index) => {
                        return (
                          <>
                            <Stack pt={1} pb={1} p={2}>
                              <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography
                                  variant="body1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.Heading}
                                </Typography>
                                <Typography
                                  textAlign="end"
                                  alignItems="end"
                                  variant="body1"
                                  noWrap
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                                >
                                  {row.Time}
                                </Typography>
                              </Grid>
                              <Description description={row.Description} />
                              {/* <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                We are happy to announce that our new version is live.
                              </Typography> */}
                            </Stack>
                            <Divider />
                          </>
                        );
                      })
                    )}

                    <ListItemButton
                      onClick={() => {
                        navigate('/notification');
                        handleToggle();
                      }}
                      disableRipple
                      sx={{ textAlign: 'center', py: `${12}px !important` }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="text.buy">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
