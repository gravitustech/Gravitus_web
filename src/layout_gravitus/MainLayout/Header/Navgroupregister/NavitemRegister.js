import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Button, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material'; //ListItemIcon
// project import
import { setActiveItemAction } from '../../../../appRedux/actions/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const GravitusNavItemRegister = ({ item }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { openItem } = useSelector((state) => state.menu);
  // console.log('oi',openItem);
  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(setActiveItemAction({ openItem: [id] }));
  };

  // const Icon = item.icon;
  // const itemIcon = item.icon ? <Icon /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(setActiveItemAction({ openItem: [item.id] }));
    }
  }, [pathname]);
  const theme = useTheme();
  // console.log(theme);

  const textColor = '#FAFAFA';
  const iconSelectedColor = theme.palette.mode === 'dark' ? '#FAFAFA' : '#FAFAFA';

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch);
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      {isMatch ? (
        <>
          <Button
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => itemHandler(item.id)}
            selected={isSelected}
            sx={{
              width: 'auto',
              height: '32px',
              bottom: '8px',
              bgcolor: theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB',
              textAlign: 'center',
              color: isSelected ? textColor : iconSelectedColor,
              '&:hover': {
                bgcolor: '#00BBAB'
                //   color: '#fff'
              },
              '&.Mui-selected': {
                bgcolor: '#00BBAB',
                color: textColor,
                '&:hover': {
                  color: '#00BBAB',
                  bgcolor: '#00BBAB'
                }
              }
            }}
          >
            <ListItemText primary={<Typography variant="subtitle3">{item.title}</Typography>} />
          </Button>
        </>
      ) : (
        <>
          <Button
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => itemHandler(item.id)}
            selected={isSelected}
            sx={{
              width: '132px',
              height: '32px',
              bottom: '8px',
              bgcolor: theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB',
              textAlign: 'center',
              color: isSelected ? textColor : iconSelectedColor,
              '&:hover': {
                bgcolor: '#00BBAB'
                //   color: '#fff'
              },
              '&.Mui-selected': {
                bgcolor: '#00BBAB',
                color: textColor,
                '&:hover': {
                  color: '#00BBAB',
                  bgcolor: '#00BBAB'
                }
              }
            }}
          >
            <ListItemText primary={<Typography variant="subtitle3">{item.title}</Typography>} />
          </Button>
        </>
      )}
    </Box>
  );
};

GravitusNavItemRegister.propTypes = {
  item: PropTypes.object
  // level: PropTypes.number
};

export default GravitusNavItemRegister;
