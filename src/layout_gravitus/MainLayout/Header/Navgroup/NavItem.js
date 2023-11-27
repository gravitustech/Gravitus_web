import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Button, ListItemText, Typography, ListItemIcon, useMediaQuery, useTheme, ListItem } from '@mui/material';

// project import
import { setActiveItemAction } from '../../../../appRedux/actions/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const GravitusNavItem = ({ item }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const { openItem } = useSelector((state) => state.menu);

  // console.log('openItem:', item);

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={isAuthorised ? item.url : item.id !== 'util-wallet' ? item.url : '/login'} target={itemTarget} />
    ))
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(setActiveItemAction({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(setActiveItemAction({ openItem: [item.id] }));
    }
  }, [pathname, dispatch, item.id, item.url]);

  // console.log('isSelected:', isSelected);

  const theme = useTheme();
  // console.log(theme);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch);

  const textColor = '#8C8C8C';
  const iconSelectedColor = theme.palette.mode === 'dark' ? 'white' : '#262626';
  // '#262626';
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ListItem
        {...listItemProps}
        disabled={item.disabled}
        onClick={() => itemHandler(item.id)}
        selected={isSelected}
        style={{
          bottom: '6px',
          textAlign: 'center',
          backgroundColor: 'inherit'
        }}
      >
        {isMatch ? (
          <>
            <ListItemIcon variant="listicon">{itemIcon}</ListItemIcon>
          </>
        ) : (
          <></>
        )}

        {isMatch ? (
          <>
            <ListItemText
              primary={
                <Typography sx={{ color: isSelected ? iconSelectedColor : textColor }} variant="subtitle4">
                  {item.title}
                </Typography>
              }
            />
          </>
        ) : (
          <>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                  {item.title}
                </Typography>
              }
            />
          </>
        )}
      </ListItem>
    </Box>
  );
};

GravitusNavItem.propTypes = {
  item: PropTypes.object
  // level: PropTypes.number
};

export default GravitusNavItem;
