// material-ui
import { Box } from '@mui/material';

// project import
import menuItem from '../../../../menu-items_gravituslogin';
import GravitusNavGrouplogin from './NavGrouplogin';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const GravitusNavigationlogin = () => {
  const navGroups = menuItem.items.map((item) => {
    return <GravitusNavGrouplogin key={item.id} item={item} />;
  });

  return <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pl: 1 }}>{navGroups}</Box>;
};

export default GravitusNavigationlogin;
