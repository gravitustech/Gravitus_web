import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

//
import dashboard from '../../../../../assets/images/gravitusimage/dashboard.svg';
import Payment from '../../../../../assets/images/gravitusimage/Paymenticon.svg';
import useridentity from '../../../../../assets/images/gravitusimage/useridentity.svg';
import security from '../../../../../assets/images/gravitusimage/security.svg';
import supportlight from '../../../../../assets/images/gravitusimage/supportlight.svg';
import about from '../../../../../assets/images/gravitusimage/about.svg';
import faq from '../../../../../assets/images/gravitusimage/faq.svg';
import logout from '../../../../../assets/images/gravitusimage/logout.svg';
import { useNavigate } from 'react-router';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState('');
  const handleListItemClick = (event, index) => {
    navigate(`/profile/${tabNameToIndex[index]}`);
    setSelectedIndex(index);
    setOpen(false);
  };
  const tabNameToIndex = {
    0: 'dashboard',
    1: 'payment',
    2: 'useridentity',
    3: 'security',
    4: 'support',
    // 5: 'about',
    6: 'faq'
  };
  const menuItems = [
    { index: 0, icon: dashboard, label: 'Dashboard' },
    { index: 1, icon: Payment, label: 'Payment' },
    { index: 2, icon: useridentity, label: 'User Identity' },
    { index: 3, icon: security, label: 'Security' },
    { index: 4, icon: supportlight, label: 'Support' },
    // { index: 5, icon: about, label: 'About' },
    { index: 6, icon: faq, label: 'FAQ' },
    { index: 7, icon: logout, label: 'Logout' }
  ];
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.index}
          selected={selectedIndex === item.index}
          onClick={item.index === 7 ? handleLogout : (event) => handleListItemClick(event, item.index)}
        >
          <ListItemIcon>
            <img src={item.icon} alt={item.label} width={22} />
          </ListItemIcon>
          <ListItemText primary={
            <Typography pl={.2} variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >
              {item.label}
            </Typography>}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
